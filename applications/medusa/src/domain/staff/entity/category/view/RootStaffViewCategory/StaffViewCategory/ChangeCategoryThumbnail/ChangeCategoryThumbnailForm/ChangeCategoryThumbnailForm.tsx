import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { TagThumbnail } from '@//:types/form'
import { ChangeCategoryThumbnailFormFragment$key } from '@//:artifacts/ChangeCategoryThumbnailFormFragment.graphql'
import { ChangeCategoryThumbnailFormMutation } from '@//:artifacts/ChangeCategoryThumbnailFormMutation.graphql'
import GenericFile from '../../../../../../../../../common/validation/GenericFile'
import UploadInput from '@//:modules/content/HookedComponents/Form/FormInput/Inputs/UploadInput/UploadInput'
import { Form, FormInput, FormSubmitButton, InputFooter, InputHeader } from '@//:modules/content/HookedComponents/Form'

interface Props {
  query: ChangeCategoryThumbnailFormFragment$key
}

type CategoryValues = TagThumbnail

const Fragment = graphql`
  fragment ChangeCategoryThumbnailFormFragment on Category {
    id
  }
`

const Mutation = graphql`
  mutation ChangeCategoryThumbnailFormMutation($input: UpdateCategoryThumbnailInput!) {
    updateCategoryThumbnail(input: $input) {
      category {
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

export default function ChangeCategoryThumbnailForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeCategoryThumbnailFormMutation>(Mutation)

  const notify = useToast()

  const schema = Joi.object({
    thumbnail: GenericFile()
  })

  const methods = useForm<CategoryValues>({
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
          title: t`Successfully updated category thumbnail`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating the category thumbnail`
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
              Category Thumbnail
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
