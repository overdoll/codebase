import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { TagThumbnail } from '@//:types/form'
import { ChangeCharacterThumbnailFormFragment$key } from '@//:artifacts/ChangeCharacterThumbnailFormFragment.graphql'
import GenericFile from '../../../validation/GenericFile'
import { ChangeCharacterThumbnailFormMutation } from '@//:artifacts/ChangeCharacterThumbnailFormMutation.graphql'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputFooter,
  InputHeader,
  UploadInput
} from '@//:modules/content/HookedComponents/Form'

interface Props {
  query: ChangeCharacterThumbnailFormFragment$key
}

type AudienceValues = TagThumbnail

const Fragment = graphql`
  fragment ChangeCharacterThumbnailFormFragment on Character {
    id
  }
`

const Mutation = graphql`
  mutation ChangeCharacterThumbnailFormMutation($input: UpdateCharacterThumbnailInput!) {
    updateCharacterThumbnail(input: $input) {
      character {
        id
        banner {
          type
          urls {
            url
            mimeType
          }
          ...ResourceIconFragment
        }
      }
    }
  }
`

export default function ChangeCharacterThumbnailForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeCharacterThumbnailFormMutation>(Mutation)

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
          title: t`Successfully updated character thumbnail`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating the character thumbnail`
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
              Character Thumbnail
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
