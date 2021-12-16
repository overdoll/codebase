/**
 * @flow
 */

import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '../../../../../../../../../../../../types/upload'
import type { useUpdateCategoryFragment$key } from '@//:artifacts/useUpdateCategoryFragment.graphql'
import { graphql, useMutation } from 'react-relay/hooks'
import type useUpdateCategoryMutation from '@//:artifacts/useUpdateCategoryMutation.graphql'
import { useFragment } from 'react-relay'
import { EVENTS, STEPS } from '../../../../../../../constants/constants'
import { useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: useUpdateCategoryFragment$key
}

const Fragment = graphql`
  fragment useUpdateCategoryFragment on Post {
    id
  }
`

const Mutation = graphql`
  mutation useUpdateCategoryMutation ($input: UpdatePostCategoriesInput!) {
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

export default function useUpdateCategory ({ uppy, dispatch, state, query }: Props) {
  const data = useFragment(Fragment, query)

  const [updateCategory, isUpdatingCategory] = useMutation < useUpdateCategoryMutation > (Mutation)

  const [t] = useTranslation('manage')

  const notify = useToast()

  const onUpdateCategory = () => {
    const currentCategories = Object.keys(state.categories)

    updateCategory({
      variables: {
        input: {
          id: data.id,
          categoryIds: currentCategories
        }
      },
      onCompleted (data) {
        dispatch({ type: EVENTS.STEP, value: STEPS.CHARACTER })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t('create_post.flow.steps.category.query.error'),
          isClosable: true
        })
      }
    })
  }

  return [onUpdateCategory, isUpdatingCategory]
}
