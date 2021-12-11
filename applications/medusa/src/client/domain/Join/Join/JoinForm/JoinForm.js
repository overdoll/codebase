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
import { useEmailFormSchema } from '@//:modules/constants/schemas';
import StyledInput from '@//:modules/form/StyledInput/StyledInput';

type JoinValues = {
  email: string,
};

type Props = {
  onSubmit: (JoinValues) => void,
  loading: boolean
}

export default function JoinForm ({ onSubmit, loading }: Props): Node {
  const [t] = useTranslation('auth')

  const schema = Joi.object({
    email: useEmailFormSchema()
  })

  const { register, handleSubmit, formState: { errors, isDirty, isSubmitted } } = useForm<JoinValues>({
    resolver: joiResolver(
      schema
    )
  })

  const success = isDirty && !errors.email && isSubmitted

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <FormControl isInvalid={errors.email} id='email'>
          <FormLabel
            zIndex={1}
            htmlFor='email'
            variant='float'
            color={!success
              ? errors.email
                ? 'orange.500'
                : 'gray.200'
              : 'green.600'}
          >
            {t('authenticate.form.email.title')}
          </FormLabel>
          <StyledInput
            register={register('email')}
            success={success}
            error={errors.email}
            placeholder={t('authenticate.form.email.placeholder')}
            errorMessage={errors.email?.message}
            size='xl'
          />
        </FormControl>
        <Button
          size='xl'
          variant='outline'
          type='submit'
          loading={loading}
          colorScheme='primary'
          w='100%'
        >
          {t('authenticate.form.continue')}
        </Button>
      </Stack>
    </form>
  )
}
