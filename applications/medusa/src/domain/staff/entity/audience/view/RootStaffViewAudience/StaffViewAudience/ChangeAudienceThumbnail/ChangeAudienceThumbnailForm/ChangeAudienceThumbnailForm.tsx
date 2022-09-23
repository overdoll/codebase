import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { TagThumbnail } from '@//:types/form'
import { ChangeAudienceThumbnailFormFragment$key } from '@//:artifacts/ChangeAudienceThumbnailFormFragment.graphql'
import { ChangeAudienceThumbnailFormMutation } from '@//:artifacts/ChangeAudienceThumbnailFormMutation.graphql'
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
  query: ChangeAudienceThumbnailFormFragment$key
}

type AudienceValues = TagThumbnail

const Fragment = graphql`
  fragment ChangeAudienceThumbnailFormFragment on Audience {
    id
  }
`

const Mutation = graphql`
  mutation ChangeAudienceThumbnailFormMutation($input: UpdateAudienceBannerInput!) {
    updateAudienceBanner(input: $input) {
      audience {
        id
        ...AudienceBannerFragment
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
    banner: GenericFile()
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
          id='banner'
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
