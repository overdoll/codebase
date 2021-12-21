import type { Dispatch, State } from '@//:types/upload'
import { useToast } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import { graphql, useMutation } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { useTranslation } from 'react-i18next'
import { EVENTS, STEPS } from '../../../../../../../constants/constants'
import type { UpdateCategoryButtonFragment$key } from '@//:artifacts/UpdateCategoryButtonFragment.graphql'
import type { UpdateCategoryButtonMutation } from '@//:artifacts/UpdateCategoryButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import { compareTwoArrays } from '@//:modules/support'

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

  const [t] = useTranslation('manage')

  const notify = useToast()

  const buttonDisabled = (Object.keys(state.categories)).length < 3

  const checkUpdate = (): void => {
    const currentCategories = data?.categories?.map((item) => item.id)
    const stateCategories = Object.keys(state.categories)

    if (compareTwoArrays(currentCategories, stateCategories) === false) {
      onUpdateCategory()
      return
    }
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
        dispatch({
          type: EVENTS.STEP,
          value: STEPS.CHARACTER
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('create_post.flow.steps.category.query.error'),
          isClosable: true
        })
      }
    })
  }

  return (
    <Button
      colorScheme='gray'
      size='lg'
      isDisabled={buttonDisabled}
      isLoading={isUpdatingCategory}
      onClick={checkUpdate}
    >{t('create_post.flow.steps.footer.forward')}
    </Button>
  )
}
