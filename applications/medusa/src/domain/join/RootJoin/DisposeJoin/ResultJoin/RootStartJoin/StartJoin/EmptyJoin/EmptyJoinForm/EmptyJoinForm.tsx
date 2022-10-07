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
  isLoading: boolean
}

export default function EmptyJoinForm (props: Props): JSX.Element {
  const {
    onSubmit,
    isLoading
  } = props

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
      <Stack w='100%' spacing={4}>
        <FormInput
          id='email'
          size='xl'
        >
          <InputBody>
            <TextInput
              placeholder={
                i18n._(t`Enter an email`)
              }
            />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          size='xl'
          variant='solid'
          colorScheme='primary'
          isLoading={isLoading}
        >
          <Trans>
            Next
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
