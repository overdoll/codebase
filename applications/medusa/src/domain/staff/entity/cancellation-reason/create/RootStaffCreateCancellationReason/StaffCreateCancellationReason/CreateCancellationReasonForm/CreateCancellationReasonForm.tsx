import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useMutation } from 'react-relay/hooks'
import { CreateCancellationReasonFormMutation } from '@//:artifacts/CreateCancellationReasonFormMutation.graphql'
import { ConnectionProp } from '@//:types/components'
import { useToast } from '@//:modules/content/ThemeComponents'
import GenericTagTitle from '../../../../../../../../common/validation/GenericTagTitle'
import { TagTitle } from '@//:types/form'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  InputHeader,
  TextInput
} from '@//:modules/content/HookedComponents/Form'

type Props = ConnectionProp

type RuleValues = TagTitle

const Mutation = graphql`
  mutation CreateCancellationReasonFormMutation($input: CreateCancellationReasonInput!, $connections: [ID!]!) {
    createCancellationReason(input: $input) {
      cancellationReason @appendNode(connections: $connections, edgeTypeName: "createCancellationReasonEdge") {
        id
        title
      }
    }
  }
`

export default function CreateCancellationReasonForm ({
  connectionId
}: Props): JSX.Element {
  const [commit, isInFlight] = useMutation<CreateCancellationReasonFormMutation>(
    Mutation
  )

  const notify = useToast()

  const { i18n } = useLingui()

  const schema = Joi.object({
    title: GenericTagTitle()
  })

  const methods = useForm<RuleValues>({
    resolver: joiResolver(
      schema
    )
  })

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: { ...formValues },
        connections: [connectionId]
      },
      onCompleted (data) {
        notify({
          status: 'success',
          title: t`Cancellation reason "${formValues.title}" was created successfully`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error creating cancellation reason ${data.message}`
        })
      }
    })
  }

  return (
    <Form
      onSubmit={onSubmit}
      {...methods}
    >
      <Stack spacing={4}>
        <FormInput
          id='title'
        >
          <InputHeader>
            <Trans>
              Cancellation Reason Title
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={i18n._(t`Enter a cancellation reason title`)} />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='lg'
        >
          <Trans>
            Create Cancellation Reason
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
