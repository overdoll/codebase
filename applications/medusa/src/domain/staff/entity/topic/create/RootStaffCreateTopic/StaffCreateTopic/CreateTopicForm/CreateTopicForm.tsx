import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useMutation } from 'react-relay/hooks'
import { CreateTopicFormMutation } from '@//:artifacts/CreateTopicFormMutation.graphql'
import { ConnectionProp } from '@//:types/components'
import { useToast } from '@//:modules/content/ThemeComponents'
import GenericTagTitle from '../../../../../../../../common/validation/GenericTagTitle'
import { TagDescription, TagSlug, TagTitle, TagWeight } from '@//:types/form'
import GenericTagDescription from '../../../../../../../../common/validation/GenericTagDescription'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  InputHeader,
  TextareaInput,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import GenericTagSlug from '../../../../../../../../common/validation/GenericTagSlug'
import GenericTagWeight from '../../../../../../../../common/validation/GenericTagWeight'
import WeightInput from '@//:modules/content/HookedComponents/Form/FormInput/Inputs/WeightInput/WeightInput'
import useSlugSubscribe from '../../../../../../../../common/support/useSlugSubscribe'
import translateValidation from '@//:modules/validation/translateValidation'

type Props = ConnectionProp

type TopicValues = TagTitle & TagDescription & TagWeight & TagSlug

const Mutation = graphql`
  mutation CreateTopicFormMutation($input: CreateTopicInput!, $connections: [ID!]!) {
    createTopic(input: $input) {
      topic @appendNode(connections: $connections, edgeTypeName: "createTopicEdge") {
        id
        title
        description
        weight
      }
      validation
    }
  }
`

export default function CreateTopicForm ({
  connectionId
}: Props): JSX.Element {
  const [commit, isInFlight] = useMutation<CreateTopicFormMutation>(
    Mutation
  )

  const notify = useToast()

  const { i18n } = useLingui()

  const schema = Joi.object({
    title: GenericTagTitle(),
    slug: GenericTagSlug(),
    description: GenericTagDescription(),
    weight: GenericTagWeight()
  })

  const methods = useForm<TopicValues>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {
      weight: 0
    }
  })

  const { setError } = methods

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: { ...formValues },
        connections: [connectionId]
      },
      onCompleted (data) {
        if (data?.createTopic?.validation != null) {
          setError('slug', {
            type: 'mutation',
            message: i18n._(translateValidation(data.createTopic.validation))
          })
          return
        }
        notify({
          status: 'success',
          title: t`Topic "${formValues.title}" was created successfully`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error creating topic ${data.message}`
        })
      }
    })
  }

  useSlugSubscribe({
    from: 'title',
    ...methods
  })

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
              Topic Title
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={i18n._(t`Enter a topic title`)} />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormInput
          id='slug'
        >
          <InputHeader>
            <Trans>
              Topic Slug
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={i18n._(t`Enter a topic slug`)} />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormInput
          id='description'
        >
          <InputHeader>
            <Trans>
              Topic Description
            </Trans>
          </InputHeader>
          <TextareaInput placeholder={i18n._(t`Enter a topic description`)} />
          <InputFooter />
        </FormInput>
        <FormInput
          id='weight'
        >
          <InputHeader>
            <Trans>
              Topic Weight
            </Trans>
          </InputHeader>
          <WeightInput />
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
