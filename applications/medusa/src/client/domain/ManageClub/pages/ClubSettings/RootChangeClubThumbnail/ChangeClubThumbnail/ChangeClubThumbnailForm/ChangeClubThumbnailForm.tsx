import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { TagThumbnail } from '@//:types/form'
import { ChangeClubThumbnailFormFragment$key } from '@//:artifacts/ChangeClubThumbnailFormFragment.graphql'
import { ChangeClubThumbnailFormMutation } from '@//:artifacts/ChangeClubThumbnailFormMutation.graphql'
import UploadInput from '@//:modules/content/HookedComponents/Form/FormInput/Inputs/UploadInput/UploadInput'
import { Form, FormInput, FormSubmitButton, InputFooter, InputHeader } from '@//:modules/content/HookedComponents/Form'
import GenericFile from '../../../../../../Staff/validation/GenericFile'

interface Props {
  query: ChangeClubThumbnailFormFragment$key
}

type ClubValues = TagThumbnail

const Fragment = graphql`
  fragment ChangeClubThumbnailFormFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation ChangeClubThumbnailFormMutation ($input: UpdateClubThumbnailInput!) {
    updateClubThumbnail(input: $input) {
      club {
        id
        name
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

export default function ChangeClubThumbnailForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, IsInFlight] = useMutation<ChangeClubThumbnailFormMutation>(Mutation)

  const notify = useToast()

  const schema = Joi.object({
    thumbnail: GenericFile()
  })

  const methods = useForm<ClubValues>({
    resolver: joiResolver(
      schema
    )
  })

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          id: data?.id,
          ...formValues
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully updated your club thumbnail`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating your club thumbnail`
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
              Club Thumbnail
            </Trans>
          </InputHeader>
          <UploadInput />
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          isLoading={IsInFlight}
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
