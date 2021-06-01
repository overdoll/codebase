/**
 * @flow
 */
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import { FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import Icon from '@//:modules/content/icon/Icon'
import { useForm } from 'react-hook-form'
import AlertCircle from '@streamlinehq/streamlinehq/img/streamline-regular/alert-circle-eixfzl.svg'
import CheckDouble1 from '@streamlinehq/streamlinehq/img/streamline-regular/check-double-1-DeGZdc.svg'
import { joiResolver } from '@hookform/resolvers/joi'
import type { Node } from 'react'
import Button from '@//:modules/form/button'

type JoinValues = {
  email: string,
};

type Props = {
  onSubmit: (JoinValues) => void,
  loading: boolean
}

const schema = Joi.object({
  email: Joi
    .string()
    .email({ minDomainSegments: 2, tlds: {} })
    .required()
})

export default function JoinForm ({ onSubmit, loading }: Props): Node {
  const [t] = useTranslation('auth')

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
                icon={success ? CheckDouble1 : AlertCircle}
                color={success ? 'green.600' : 'orange.500'}
              />
            </InputRightElement>
          )}
        </InputGroup>
        <FormHelperText>
          {errors.email && t('authenticate.form.validation.email.pattern')}
        </FormHelperText>
      </FormControl>
      <Button
        size='xl'
        variant='outline'
        type='submit'
        loading={loading}
        colorScheme='red'
        w='100%'
      >
        {t('authenticate.form.continue')}
      </Button>
    </form>
  )
}
