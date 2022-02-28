import Joi from 'joi'
import { Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Email from '@//:modules/validation/Email'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputHeader,
  TextInput
} from '@//:modules/content/HookedComponents/Form'

interface JoinValues {
  email: string
}

interface Props {
  onSubmit: (JoinValues) => void
  loading: boolean
}

export default function JoinForm ({
  onSubmit,
  loading
}: Props): JSX.Element {
  const schema = Joi.object({
    email: Email()
  })

  const methods = useForm<JoinValues>({
    resolver: joiResolver(
      schema
    )
  })

  const { i18n } = useLingui()

  return (
    <Form onSubmit={onSubmit} {...methods}>
      <Stack spacing={6}>
        <FormInput
          id='email'
          size='xl'
        >
          <InputHeader>
            <Trans>
              Email
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={
              i18n._(t`Enter an email`)
            }
            />
          </InputBody>
          <InputFeedback />
        </FormInput>
        <FormSubmitButton
          size='xl'
          variant='outline'
          isLoading={loading}
          colorScheme='primary'
          w='100%'
        >
          <Trans>
            Continue
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
