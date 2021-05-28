/**
 * @flow
 */
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import { Button, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import { useForm } from 'react-hook-form'
import AlertCircle from '@streamlinehq/streamlinehq/img/streamline-regular/alert-circle-eixfzl.svg'
import CheckDouble1 from '@streamlinehq/streamlinehq/img/streamline-regular/check-double-1-DeGZdc.svg'
import { joiResolver } from '@hookform/resolvers/joi'

type RegisterValues = {
  username: string,
};

const schema = Joi.object({
  username: Joi
    .string()
    .required()
})

export default function RegisterForm ({ onSubmit, loading }) {
  const [t] = useTranslation('auth')

  const { register, handleSubmit, formState: { errors, isDirty, isSubmitted } } = useForm<RegisterValues>({
    resolver: joiResolver(
      schema
    )
  })

  const success = isDirty && !errors.username && isSubmitted

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.username} id='username'>
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
                size='xl'
                icon={success ? CheckDouble1 : AlertCircle}
                color={success ? 'green.600' : 'orange.500'}
              />
            </InputRightElement>
          )}
        </InputGroup>
        <FormHelperText>
          {errors.username?.message}
        </FormHelperText>
      </FormControl>
      <Button
        size='md'
        type='submit'
        isLoading={loading}
        width='100%'
      >
        {t('register.form.submit')}
      </Button>
    </form>
  )
}
