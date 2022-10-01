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
  InputFooter,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import { useLingui } from '@lingui/react'

interface RegisterValues {
  username: string
}

interface Props {
  onSubmit: (RegisterValues) => void
  isLoading: boolean
}

export default function RegisterAuthenticationTokenForm (props: Props): JSX.Element {
  const {
    onSubmit,
    isLoading
  } = props

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
          size='lg'
          id='username'
        >
          <InputBody>
            <TextInput
              borderColor='transparent'
              placeholder={i18n._(t`Enter a username`)}
              variant='outline'
            />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          size='lg'
          variant='solid'
          colorScheme='green'
          isLoading={isLoading}
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
