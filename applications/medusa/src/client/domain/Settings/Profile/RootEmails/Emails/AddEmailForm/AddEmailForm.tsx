import { graphql, useMutation } from 'react-relay/hooks'
import { HStack } from '@chakra-ui/react'
import type { AddEmailFormMutation } from '@//:artifacts/AddEmailFormMutation.graphql'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Email from '@//:modules/validation/Email'
import { ConnectionProp } from '@//:types/components'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputHeader,
  TextInput
} from '@//:modules/content/HookedComponents/Form'

interface EmailValues {
  email: string
}

interface Props extends ConnectionProp {
  isDisabled: boolean
}

const Mutation = graphql`
  mutation AddEmailFormMutation($input: AddAccountEmailInput!, $connections: [ID!]!) {
    addAccountEmail(input: $input) {
      accountEmail @appendNode(connections: $connections, edgeTypeName: "updateEmailPrimaryEdge") {
        id
        email
        status
      }
    }
  }
`

export default function AddEmailForm ({
  connectionId,
  isDisabled
}: Props): JSX.Element {
  const [addEmail, isAddingEmail] = useMutation<AddEmailFormMutation>(
    Mutation
  )

  const schema = Joi.object({
    email: Email()
  })

  const methods = useForm<EmailValues>({
    resolver: joiResolver(
      schema
    )
  })

  const { i18n } = useLingui()

  const notify = useToast()

  const onSubmit = (formValues): void => {
    addEmail({
      variables: {
        input: {
          ...formValues
        },
        connections: [connectionId]
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`A confirmation email was sent to ${formValues.email}. Check your inbox/spam!`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error adding the email`
        })
      }
    }
    )
  }

  return (
    <Form {...methods} onSubmit={onSubmit}>
      <FormInput size='sm' id='email'>
        <InputHeader>
          <Trans>
            Add an email
          </Trans>
        </InputHeader>
        <HStack align='flex-start'>
          <InputBody>
            <TextInput placeholder={i18n._(t`Enter a new email address`)} />
            <InputFeedback />
          </InputBody>
          <FormSubmitButton
            size='sm'
            isLoading={isAddingEmail}
            isDisabled={isDisabled}
          >
            <Trans>
              Submit
            </Trans>
          </FormSubmitButton>
        </HStack>
      </FormInput>
    </Form>
  )
}
