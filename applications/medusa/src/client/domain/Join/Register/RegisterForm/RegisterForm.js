/**
 * @flow
 */
import Joi from 'joi';
import { useTranslation } from 'react-i18next';
import { FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import type { Node } from 'react';
import Button from '@//:modules/form/Button';
import { useUsernameFormSchema } from '@//:modules/constants/schemas';
import StyledInput from '@//:modules/form/StyledInput/StyledInput';

type RegisterValues = {
  username: string,
};

type Props = {
  onSubmit: (RegisterValues) => void,
  loading: boolean
}

export default function RegisterForm ({ onSubmit, loading }: Props): Node {
  const [t] = useTranslation('auth')

  const schema = Joi.object({
    username: useUsernameFormSchema()
  })

  const { register, handleSubmit, formState: { errors, isDirty, isSubmitted } } = useForm<RegisterValues>({
    resolver: joiResolver(
      schema
    )
  })

  const success = isDirty && !errors.username && isSubmitted

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <FormControl
          isInvalid={errors.username}
          id='username'
        >
          <FormLabel
            htmlFor='username'
            variant='float'
            color={!success
              ? errors.username
                ? 'orange.500'
                : 'gray.200'
              : 'green.600'}
          >
            {t('register.form.username.title')}
          </FormLabel>
          <StyledInput
            register={register('username')}
            success={success}
            error={errors.username}
            placeholder={t('register.form.username.placeholder')}
            errorMessage={errors.username?.message}
          />
        </FormControl>
        <Button
          size='xl'
          variant='outline'
          type='submit'
          loading={loading}
          colorScheme='green'
          w='100%'
        >
          {t('register.form.submit')}
        </Button>
      </Stack>
    </form>
  )
}
