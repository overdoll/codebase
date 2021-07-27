/**
 * @flow
 */
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import { FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { useForm } from 'react-hook-form'
import AlertCircle from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/alerts/alert-circle.svg'
import CheckDouble1
  from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/form-validation/check-double-1.svg'
import { joiResolver } from '@hookform/resolvers/joi'
import type { Node } from 'react'
import Button from '@//:modules/form/button'

type UsernameValues = {
  username: string,
};

type Props = {
  onSubmit: (UsernameValues) => void,
  loading: boolean
}

const schema = Joi.object({
  username: Joi
    .string()
    .required()
})

export default function ChangeUsernameForm ({ onSubmit, loading }: Props): Node {
  const [t] = useTranslation('settings')

  const { register, handleSubmit, formState: { errors, isDirty, isSubmitted } } = useForm<UsernameValues>({
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
          {t('profile.username.modal.input_title')}
        </FormLabel>
        <InputGroup size='xl'>
          <Input
            {...register('username')}
            variant='filled'
            placeholder={t('profile.username.modal.header')}
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
          {errors.username && t('profile.username.modal.form.validation.username.required')}
        </FormHelperText>
      </FormControl>
      <Button
        size='lg'
        variant='solid'
        type='submit'
        colorScheme='green'
        w='100%'
        isDisabled={errors.username}
        isLoading={loading}
      >
        {t('profile.username.modal.submit')}
      </Button>
    </form>
  )
}
