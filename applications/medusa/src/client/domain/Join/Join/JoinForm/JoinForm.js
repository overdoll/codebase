/**
 * @flow
 */
import Joi from 'joi';
import { useTranslation } from 'react-i18next';
import { FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import Icon from '@//:modules/content/Icon/Icon';
import { useForm } from 'react-hook-form';
import InterfaceValidationCheck
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check.svg';
import { joiResolver } from '@hookform/resolvers/joi';
import type { Node } from 'react';
import Button from '@//:modules/form/Button';
import InterfaceAlertWarningTriangle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/alerts/interface-alert-warning-triangle.svg';
import { useEmailFormSchema } from '@//:modules/constants/schemas';

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
        <InputGroup size='xl'>
          <Input
            {...register('email')}
            variant='filled'
            placeholder={t('authenticate.form.email.placeholder')}
            isInvalid={errors.email}
          />
          {(errors.email || success) && (
            <InputRightElement>
              <Icon
                w={6}
                h={6}
                icon={success ? InterfaceValidationCheck : InterfaceAlertWarningTriangle}
                fill={success ? 'green.600' : 'orange.500'}
              />
            </InputRightElement>
          )}
        </InputGroup>
        <FormHelperText>
          {errors.email && errors.email.message}
        </FormHelperText>
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
    </form>
  )
}
