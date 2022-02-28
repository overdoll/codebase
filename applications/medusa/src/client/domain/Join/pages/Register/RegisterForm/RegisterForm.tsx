import Joi from 'joi'
import { Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { t, Trans } from '@lingui/macro'
import Username from '@//:modules/validation/Username'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputHeader,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import { useLingui } from '@lingui/react'

interface RegisterValues {
  username: string
}

interface Props {
  onSubmit: (RegisterValues) => void
  loading: boolean
}

export default function RegisterForm ({
  onSubmit,
  loading
}: Props): JSX.Element {
  const { i18n } = useLingui()

  const schema = Joi.object({
    username: Username()
  })

  const methods = useForm<RegisterValues>({
    resolver: joiResolver(
      schema
    )
  })

  return (
    <Form {...methods} onSubmit={onSubmit}>
      <Stack spacing={6}>
        <FormInput
          size='xl'
          id='username'
        >
          <InputHeader>
            <Trans>
              Username
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={i18n._(t`Enter a username`)} />
          </InputBody>
        </FormInput>
        <FormSubmitButton
          size='xl'
          variant='outline'
          isLoading={loading}
          colorScheme='green'
          w='100%'
        >
          <Trans>
            Register
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
