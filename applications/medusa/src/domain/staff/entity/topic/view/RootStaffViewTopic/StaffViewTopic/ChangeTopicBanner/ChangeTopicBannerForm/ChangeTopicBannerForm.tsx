import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { TagThumbnail } from '@//:types/form'
import { ChangeTopicBannerFormFragment$key } from '@//:artifacts/ChangeTopicBannerFormFragment.graphql'
import { ChangeTopicBannerFormMutation } from '@//:artifacts/ChangeTopicBannerFormMutation.graphql'
import GenericFile from '../../../../../../../../../common/validation/GenericFile'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputFooter,
  InputHeader,
  UploadInput
} from '@//:modules/content/HookedComponents/Form'

interface Props {
  query: ChangeTopicBannerFormFragment$key
}

type TopicValues = TagThumbnail

const Fragment = graphql`
  fragment ChangeTopicBannerFormFragment on Topic {
    id
  }
`

const Mutation = graphql`
  mutation ChangeTopicBannerFormMutation($input: UpdateTopicBannerInput!) {
    updateTopicBanner(input: $input) {
      topic {
        id
        ...TopicBannerFragment
      }
    }
  }
`

export default function ChangeTopicBannerForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeTopicBannerFormMutation>(Mutation)

  const notify = useToast()

  const schema = Joi.object({
    thumbnail: GenericFile()
  })

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
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully updated topic thumbnail`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating the topic thumbnail`
        })
      }
    }
    )
  }

  return (
    <Form
      onSubmit={onSubmit}
      {...methods}
    >
      <Stack spacing={4}>
        <FormInput
          id='thumbnail'
          size='md'
        >
          <InputHeader>
            <Trans>
              Topic Thumbnail
            </Trans>
          </InputHeader>
          <UploadInput />
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
