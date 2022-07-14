import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { TagWeight } from '@//:types/form'
import { ChangeTopicWeightFormMutation } from '@//:artifacts/ChangeTopicWeightFormMutation.graphql'
import { ChangeTopicWeightFormFragment$key } from '@//:artifacts/ChangeTopicWeightFormFragment.graphql'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  InputHeader
} from '@//:modules/content/HookedComponents/Form'
import GenericTagWeight from '../../../../../../../../../common/validation/GenericTagWeight'
import WeightInput from '@//:modules/content/HookedComponents/Form/FormInput/Inputs/WeightInput/WeightInput'

interface Props {
  query: ChangeTopicWeightFormFragment$key
}

type TopicValues = TagWeight

const Fragment = graphql`
  fragment ChangeTopicWeightFormFragment on Topic {
    id @required(action: THROW)
  }
`

const Mutation = graphql`
  mutation ChangeTopicWeightFormMutation ($input: UpdateTopicWeightInput!) {
    updateTopicWeight(input: $input) {
      topic {
        id
        weight
      }
    }
  }
`

export default function ChangeTopicWeightForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeTopicWeightFormMutation>(Mutation)

  const schema = Joi.object({
    weight: GenericTagWeight()
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
          title: t`Updated topic weight to ${formValues.weight}`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error updating topic weight`
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
          id='weight'
          size='sm'
        >
          <InputHeader>
            <Trans>
              Topic Weight
            </Trans>
          </InputHeader>
          <InputBody>
            <WeightInput />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='sm'
        >
          <Trans>
            Submit
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
