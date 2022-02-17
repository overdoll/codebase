import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { TagUrl } from '@//:types/form'
import { ChangeAudienceThumbnailFormFragment$key } from '@//:artifacts/ChangeAudienceThumbnailFormFragment.graphql'
import { ChangeAudienceThumbnailFormMutation } from '@//:artifacts/ChangeAudienceThumbnailFormMutation.graphql'
import GenericFile from '../../../../../../validation/GenericFile'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputFooter,
  InputHeader,
  UploadInput
} from '@//:modules/content/HookedComponents/Form'

interface Props {
  query: ChangeAudienceThumbnailFormFragment$key
}

type AudienceValues = TagUrl

const Fragment = graphql`
  fragment ChangeAudienceThumbnailFormFragment on Audience {
    id
  }
`

const Mutation = graphql`
  mutation ChangeAudienceThumbnailFormMutation($input: UpdateAudienceThumbnailInput!) {
    updateAudienceThumbnail(input: $input) {
      audience {
        id
        thumbnail {
          type
          urls {
            url
            mimeType
          }
        }
      }
    }
  }
`

export default function ChangeAudienceThumbnailForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeAudienceThumbnailFormMutation>(Mutation)

  const notify = useToast()

  const schema = Joi.object({
    thumbnail: GenericFile()
  })

  const methods = useForm<AudienceValues>({
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
          title: t`Successfully updated audience thumbnail`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating the audience thumbnail`
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
              Audience Thumbnail
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
