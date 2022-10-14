import Joi from 'joi'
import { Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { t, Trans } from '@lingui/macro'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFooter,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import { useLingui } from '@lingui/react'
import VerifyToken6DigitSecret from '@//:modules/validation/VerifyToken6DigitSecret'
import { useEffect } from 'react'

interface RegisterValues {
  secret: string
}

interface Props {
  onSubmit: (props) => void
  isLoading: boolean
}

export default function CodeAuthenticationTokenJoinForm (props: Props): JSX.Element {
  const {
    onSubmit,
    isLoading
  } = props

  const { i18n } = useLingui()

  const schema = Joi.object({
    secret: VerifyToken6DigitSecret()
  })

  const methods = useForm<RegisterValues>({
    resolver: joiResolver(
      schema
    )
  })

  const {
    watch,
    handleSubmit,
    setValue
  } = methods

  useEffect(() => {
    const subscription = watch((value, {
      name
    }) => {
      if (name === 'secret') {
        if (value.secret != null && value.secret !== '' && value.secret.trim().length !== value.secret.length) {
          setValue('secret', value.secret.trim())
        } else if (value.secret != null && value.secret.trim().length === 6) {
          console.log('submit')
          void handleSubmit(onSubmit)()
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [handleSubmit, watch])

  return (
    <Form {...methods} onSubmit={onSubmit}>
      <Stack w='100%' spacing={6}>
        <FormInput
          size='xl'
          id='secret'
        >
          <InputBody>
            <TextInput
              placeholder={i18n._(t`Enter 6-digit code`)}
            />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          size='xl'
          variant='solid'
          colorScheme='primary'
          isLoading={isLoading}
          w='100%'
        >
          <Trans>
            Next
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
