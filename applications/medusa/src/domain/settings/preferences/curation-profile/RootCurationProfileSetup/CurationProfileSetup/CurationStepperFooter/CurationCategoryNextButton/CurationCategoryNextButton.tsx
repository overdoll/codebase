import { t } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { HStack } from '@chakra-ui/react'
import type { CurationCategoryNextButtonFragment$key } from '@//:artifacts/CurationCategoryNextButtonFragment.graphql'
import compareTwoArrays from '@//:modules/support/compareTwoArrays'
import { FlowBuilderSaveButton, FlowBuilderSkipButton } from '@//:modules/content/PageLayout'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface Props {
  nextStep: () => void
  query: CurationCategoryNextButtonFragment$key | null
}

const Fragment = graphql`
  fragment CurationCategoryNextButtonFragment on CategoryCurationProfile {
    categories {
      id
    }
  }
`

const Mutation = graphql`
  mutation CurationCategoryNextButtonMutation($categoryIds: [ID!]!, $skipped: Boolean!) {
    updateCurationProfileCategory(input: {categoryIds: $categoryIds, skipped: $skipped}) {
      curationProfile {
        id
        completed
        category {
          skipped
          completed
          categories {
            id
          }
        }
      }
    }
  }
`

export default function CurationCategoryNextButton ({
  query,
  nextStep
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [updateCategory, isUpdatingCategory] = useMutation(Mutation)

  const {
    state,
    dispatch
  } = useSequenceContext()

  const notify = useToast()

  const currentCategoryIds = data?.categories.map((item) => item.id) ?? []

  const saveCondition = Object.keys(state.category).length > 0 &&
    compareTwoArrays(Object.keys(state.category), currentCategoryIds) === false

  const onUpdateCategory = (): void => {
    updateCategory({
      variables: {
        categoryIds: Object.keys(state.category),
        skipped: false
      },
      onCompleted () {

      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error saving the categories`
        })
      }
    })
  }

  const onSkipCategory = (): void => {
    updateCategory({
      variables: {
        categoryIds: [],
        skipped: true
      },
      onCompleted () {
        dispatch({
          type: 'category',
          value: {},
          transform: 'SET'
        })
        notify({
          status: 'info',
          title: t`Category preference was skipped`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error skipping the categories`
        })
      }
    })
  }

  const NextButton = (): JSX.Element => {
    if (saveCondition) {
      return (
        <FlowBuilderSaveButton
          onClick={onUpdateCategory}
          isLoading={isUpdatingCategory}
        />
      )
    }
    return <></>
  }

  return (
    <HStack spacing={2}>
      <FlowBuilderSkipButton
        onClick={onSkipCategory}
        isLoading={isUpdatingCategory}
      />
      <NextButton />
    </HStack>
  )
}
