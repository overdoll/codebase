import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { DeleteAccountFormMutation } from '@//:artifacts/DeleteAccountFormMutation.graphql'
import type { DeleteAccountFormFragment$key } from '@//:artifacts/DeleteAccountFormFragment.graphql'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { t, Trans } from '@lingui/macro'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import { Stack, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import HighlightInline from '@//:modules/content/ContentHints/HighlightInline/HighlightInline'

interface FormValues {
  confirmation: string
}

interface Props {
  query: DeleteAccountFormFragment$key
}

const Fragment = graphql`
  fragment DeleteAccountFormFragment on Account {
    id
    username
  }
`

const Mutation = graphql`
  mutation DeleteAccountFormMutation($input: DeleteAccountInput!) {
    deleteAccount(input: $input) {
      account {
        id
        isDeleted
        deleting {
          scheduledDeletion
        }
      }
    }
  }
`

export default function DeleteAccountForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  const validString = `delete ${data.username}`

  const [commit, isInFlight] = useMutation<DeleteAccountFormMutation>(
    Mutation
  )

  const schema = Joi.object({
    confirmation: Joi
      .string()
      .valid(validString)
      .required()
      .messages({
        'any.only': i18n._(t`Please enter the required hint`)
      })
  })

  const methods = useForm<FormValues>({
    resolver: joiResolver(
      schema
    )
  })

  const notify = useToast()

  const onSubmit = (): void => {
    commit({
      variables: {
        input: {
          accountID: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Your account has been successfully scheduled for deletion`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error deleting your account`
        })
      }
    }
    )
  }

  return (
    <Stack>
      <Text fontSize='md' color='gray.00'>
        <Trans>Please type <HighlightInline colorScheme='orange'>{validString}</HighlightInline> into the
          input below to
          confirm that you would like to delete your account.
        </Trans>
      </Text>
      <Form {...methods} onSubmit={onSubmit}>
        <Stack spacing={2}>
          <FormInput size='lg' id='confirmation'>
            <InputBody>
              <TextInput placeholder={validString} />
              <InputFeedback />
            </InputBody>
            <InputFooter />
          </FormInput>
          <FormSubmitButton
            size='lg'
            colorScheme='orange'
            isLoading={isInFlight}
          >
            <Trans>
              Confirm Delete Account
            </Trans>
          </FormSubmitButton>
        </Stack>
      </Form>
    </Stack>
  )
}
