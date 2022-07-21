import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { TagTopicId } from '@//:types/form'
import { ChangeCategoryTopicFormMutation } from '@//:artifacts/ChangeCategoryTopicFormMutation.graphql'
import { ChangeCategoryTopicFormFragment$key } from '@//:artifacts/ChangeCategoryTopicFormFragment.graphql'
import { Form, FormInput, FormSubmitButton, InputFooter } from '@//:modules/content/HookedComponents/Form'
import TopicInput from '@//:modules/content/HookedComponents/Form/FormInput/Inputs/TopicInput/TopicInput'
import GenericTagId from '../../../../../../../../../common/validation/GenericTagId'

interface Props {
  query: ChangeCategoryTopicFormFragment$key
}

type TopicValues = TagTopicId

const Fragment = graphql`
  fragment ChangeCategoryTopicFormFragment on Category {
    id @required(action: THROW)
  }
`

const Mutation = graphql`
  mutation ChangeCategoryTopicFormMutation ($input: UpdateCategoryTopicInput!) {
    updateCategoryTopic(input: $input) {
      category {
        id
        topic {
          id
          title
        }
      }
    }
  }
`
export default function ChangeCategoryTopicForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeCategoryTopicFormMutation>(Mutation)

  const schema = Joi.object({
    topicId: GenericTagId()
  })

  const notify = useToast()

  const methods = useForm<TopicValues>({
    resolver: joiResolver(
      schema
    )
  })

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          id: data.id,
          ...formValues
        }
      },
      onCompleted (data) {
        notify({
          status: 'success',
          title: t`Updated category topic`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error updating category topic`
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
          id='topicId'
          size='md'
        >
          <TopicInput />
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='md'
        >
          <Trans>
            Submit
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
