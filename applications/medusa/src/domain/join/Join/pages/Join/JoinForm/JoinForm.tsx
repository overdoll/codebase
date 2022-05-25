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
  InputFooter,
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
      <Stack spacing={4}>
        <FormInput
          id='email'
          size='lg'
        >
          <InputBody>
            <TextInput
              borderColor='transparent'
              variant='outline'
              placeholder={
                i18n._(t`Enter an email`)
              }
            />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          size='lg'
          variant='solid'
          colorScheme='primary'
          isLoading={loading}
        >
          <Trans>
            Continue
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
