/**
 * @flow
 */
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { useForm } from 'react-hook-form'
import InterfaceValidationCheck
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check.svg'

import InterfaceAlertWarningTriangle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/alerts/interface-alert-warning-triangle.svg'
import { joiResolver } from '@hookform/resolvers/joi'
import type { Node } from 'react'
import Button from '@//:modules/form/Button'
import { usernameSchema } from '@//:modules/constants/schemas/FormSchemas'

type RegisterValues = {
  username: string,
};

type Props = {
  onSubmit: (RegisterValues) => void,
  loading: boolean
}

const schema = Joi.object({
  username: usernameSchema
})

export default function RegisterForm ({ onSubmit, loading }: Props): Node {
  const [t] = useTranslation('auth')

  const { register, handleSubmit, formState: { errors, isDirty, isSubmitted } } = useForm<RegisterValues>({
    resolver: joiResolver(
      schema
    )
  })

  const success = isDirty && !errors.username && isSubmitted

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <InputGroup size='xl'>
          <Input
            {...register('username')}
            variant='filled'
            placeholder={t('register.form.username.placeholder')}
            isInvalid={errors.username}
          />
          {(errors.username || success) && (
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
          {errors.username && errors.username.type === 'string.empty' && t('register.form.validation.username.empty')}
          {errors.username && errors.username.type === 'string.min' && t('register.form.validation.username.min')}
          {errors.username && errors.username.type === 'string.max' && t('register.form.validation.username.max')}
          {errors.username && errors.username.type === 'string.alphanum' && t('register.form.validation.username.alphanum')}
        </FormHelperText>
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
    </form>
  )
}
