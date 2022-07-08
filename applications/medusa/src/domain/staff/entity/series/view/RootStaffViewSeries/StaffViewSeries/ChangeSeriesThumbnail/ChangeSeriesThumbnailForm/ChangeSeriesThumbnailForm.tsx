import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { TagThumbnail } from '@//:types/form'
import { ChangeSeriesThumbnailFormFragment$key } from '@//:artifacts/ChangeSeriesThumbnailFormFragment.graphql'
import GenericFile from '../../../../../../../../../common/validation/GenericFile'
import { ChangeSeriesThumbnailFormMutation } from '@//:artifacts/ChangeSeriesThumbnailFormMutation.graphql'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputFooter,
  InputHeader,
  UploadInput
} from '@//:modules/content/HookedComponents/Form'

interface Props {
  query: ChangeSeriesThumbnailFormFragment$key
}

type SeriesValues = TagThumbnail

const Fragment = graphql`
  fragment ChangeSeriesThumbnailFormFragment on Series {
    id
  }
`

const Mutation = graphql`
  mutation ChangeSeriesThumbnailFormMutation($input: UpdateSeriesThumbnailInput!) {
    updateSeriesThumbnail(input: $input) {
      series {
        id
        banner {
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

export default function ChangeSeriesThumbnailForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeSeriesThumbnailFormMutation>(Mutation)

  const notify = useToast()

  const schema = Joi.object({
    thumbnail: GenericFile()
  })

  const methods = useForm<SeriesValues>({
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
          title: t`Successfully updated series thumbnail`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating the series thumbnail`
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
              Series Thumbnail
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
