
import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { UpdateCategoryButtonFragment$key } from '@//:artifacts/UpdateCategoryButtonFragment.graphql'
import type { UpdateCategoryButtonMutation } from '@//:artifacts/UpdateCategoryButtonMutation.graphql'
import { compareTwoArrays } from '@//:modules/support'
import { t } from '@lingui/macro'
import { useContext } from 'react'
import { FlowBuilderNextButton, FlowBuilderSaveButton } from '@//:modules/content/PageLayout'
import { StateContext } from '@//:modules/hooks/useReducerBuilder/context'
import { useToast } from '@//:modules/content/ThemeComponents'
interface Props {
  query: UpdateCategoryButtonFragment$key
  nextStep: () => void
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
export default function UpdateCategoryButton ({
  query,
  nextStep
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const state = useContext(StateContext)

  const [updateCategory, isUpdatingCategory] = useMutation<UpdateCategoryButtonMutation>(Mutation)

  const notify = useToast()

  const buttonDisabled = (Object.keys(state.categories.value)).length < 3

  const hasUpdate = (): boolean => {
    const currentCategories = data?.categories?.map((item) => item.id)
    const stateCategories = Object.keys(state.categories.value)

    return compareTwoArrays(currentCategories, stateCategories) === false
  }

  const onUpdateCategory = (): void => {
    if (buttonDisabled) return

    const currentCategories = Object.keys(state.categories.value)

    updateCategory({
      variables: {
        input: {
          id: data.id,
          categoryIds: currentCategories
        }
      },
      onCompleted () {
        nextStep()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error saving the categories`
        })
      }
    })
  }

  if (hasUpdate() && Object.keys(state.categories.value).length > 2) {
    return (
      <FlowBuilderSaveButton
        isDisabled={buttonDisabled}
        isLoading={isUpdatingCategory}
        onClick={onUpdateCategory}
      />
    )
  }

  return (
    <FlowBuilderNextButton isDisabled={buttonDisabled} />
  )
}
