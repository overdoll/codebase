/**
 * @flow
 */
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { useForm } from 'react-hook-form'
import AlertCircle from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/alerts/alert-circle.svg'
import CheckDouble1
  from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/form-validation/check-double-1.svg'
import { joiResolver } from '@hookform/resolvers/joi'
import type { Node } from 'react'
import Button from '@//:modules/form/Button'

type RegisterValues = {
  username: string,
};

type Props = {
  onSubmit: (RegisterValues) => void,
  loading: boolean
}

const schema = Joi.object({
  username: Joi
    .string()
    .alphanum()
    .min(3)
    .max(15)
    .required()
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
                icon={success ? CheckDouble1 : AlertCircle}
                color={success ? 'green.600' : 'orange.500'}
                m={4}
              />
            </InputRightElement>
          )}
        </InputGroup>
        <FormHelperText>
          {errors.username && errors.username.type === 'string.empty' && t('authenticate.form.validation.username.empty')}
          {errors.username && errors.username.type === 'string.min' && t('authenticate.form.validation.username.min')}
          {errors.username && errors.username.type === 'string.max' && t('authenticate.form.validation.username.max')}
          {errors.username && errors.username.type === 'string.alphanum' && t('authenticate.form.validation.username.alphanum')}
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
