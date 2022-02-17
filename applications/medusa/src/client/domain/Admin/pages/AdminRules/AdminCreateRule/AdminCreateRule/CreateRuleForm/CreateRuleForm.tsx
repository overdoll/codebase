import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useMutation } from 'react-relay/hooks'
import { CreateRuleFormMutation } from '@//:artifacts/CreateRuleFormMutation.graphql'
import { ConnectionProp } from '@//:types/components'
import { useToast } from '@//:modules/content/ThemeComponents'
import GenericTagTitle from '../../../../../validation/GenericTagTitle'
import { TagDescription, TagInfraction, TagTitle } from '@//:types/form'
import GenericBoolean from '../../../../../validation/GenericBoolean'
import GenericTagDescription from '../../../../../validation/GenericTagDescription'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  InputHeader,
  SwitchInput,
  TextareaInput,
  TextInput
} from '@//:modules/content/HookedComponents/Form'

type Props = ConnectionProp

type RuleValues = TagTitle & TagDescription & TagInfraction

const Mutation = graphql`
  mutation CreateRuleFormMutation($input: CreateRuleInput!, $connections: [ID!]!) {
    createRule(input: $input) {
      rule @appendNode(connections: $connections, edgeTypeName: "createAudienceEdge") {
        id
        title
        description
      }
    }
  }
`

export default function CreateRuleForm ({
  connectionId
}: Props): JSX.Element {
  const [commit, isInFlight] = useMutation<CreateRuleFormMutation>(
    Mutation
  )

  const notify = useToast()

  const { i18n } = useLingui()

  const schema = Joi.object({
    title: GenericTagTitle(),
    description: GenericTagDescription(),
    infraction: GenericBoolean()
  })

  const methods = useForm<RuleValues>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {
      infraction: false
    }
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
          title: t`Rule ${formValues.title} was created successfully`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error creating rule ${data.message}`
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
              Rule Title
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={i18n._(t`Enter a rule title`)} />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormInput
          id='description'
        >
          <InputHeader>
            <Trans>
              Rule Description
            </Trans>
          </InputHeader>
          <TextareaInput
            variant='filled'
            placeholder={i18n._(t`Enter a description for the rule`)}
          />
          <InputFooter />
        </FormInput>
        <FormInput
          id='infraction'
        >
          <InputHeader>
            <Trans>
              Rule Infraction
            </Trans>
          </InputHeader>
          <SwitchInput placeholder={i18n._(t`Causes an infraction`)} />
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='lg'
        >
          <Trans>
            Create Rule
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
