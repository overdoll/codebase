import type { Dispatch, State } from '@//:types/upload'
import { useToast } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { EVENTS, STEPS } from '../../../../../../../constants/constants'
import type { UpdateCategoryButtonFragment$key } from '@//:artifacts/UpdateCategoryButtonFragment.graphql'
import type { UpdateCategoryButtonMutation } from '@//:artifacts/UpdateCategoryButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import { compareTwoArrays } from '@//:modules/support'
import { t, Trans } from '@lingui/macro'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: UpdateCategoryButtonFragment$key
}

const Fragment = graphql`
  fragment UpdateCategoryButtonFragment on Post {
    id
    categories {
      id
    }
  }
`

const Mutation = graphql`
  mutation UpdateCategoryButtonMutation ($input: UpdatePostCategoriesInput!) {
    updatePostCategories(input: $input) {
      post {
        id
        categories {
          id
          title
          slug
          thumbnail {
            type
            urls {
              mimeType
              url
            }
          }
        }
      }
    }
  }
`
export default function UpdateBrandButton ({
  state,
  uppy,
  dispatch,
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [updateCategory, isUpdatingCategory] = useMutation<UpdateCategoryButtonMutation>(Mutation)

  const notify = useToast()

  const buttonDisabled = (Object.keys(state.categories)).length < 3

  const hasUpdate = (): boolean => {
    const currentCategories = data?.categories?.map((item) => item.id)
    const stateCategories = Object.keys(state.categories)

    return compareTwoArrays(currentCategories, stateCategories) === false
  }

  const goNext = (): void => {
    dispatch({
      type: EVENTS.STEP,
      value: STEPS.CHARACTER
    })
  }

  const onUpdateCategory = (): void => {
    if (buttonDisabled) return

    const currentCategories = Object.keys(state.categories)

    updateCategory({
      variables: {
        input: {
          id: data.id,
          categoryIds: currentCategories
        }
      },
      onCompleted () {
        goNext()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error saving the categories`,
          isClosable: true
        })
      }
    })
  }

  if (hasUpdate() && Object.keys(state.categories).length > 2) {
    return (
      <Button
        colorScheme='green'
        size='lg'
        isDisabled={buttonDisabled}
        isLoading={isUpdatingCategory}
        onClick={onUpdateCategory}
      >
        <Trans>
          Save
        </Trans>
      </Button>
    )
  }

  return (
    <Button
      colorScheme='gray'
      size='lg'
      isDisabled={buttonDisabled}
      onClick={goNext}
    >
      <Trans>
        Next
      </Trans>
    </Button>
  )
}
