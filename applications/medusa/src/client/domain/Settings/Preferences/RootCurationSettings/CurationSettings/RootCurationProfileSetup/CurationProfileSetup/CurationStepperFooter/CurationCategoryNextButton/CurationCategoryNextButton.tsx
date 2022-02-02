import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useContext } from 'react'
import { DispatchContext, StateContext } from '@//:modules/hooks/useReducerBuilder/context'
import { HStack, useToast } from '@chakra-ui/react'
import type { CurationCategoryNextButtonFragment$key } from '@//:artifacts/CurationCategoryNextButtonFragment.graphql'
import { FlowBuilderNextButton } from '../../../../../../../../../components/FlowBuilder'
import { compareTwoArrays } from '@//:modules/support'

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

  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)

  const notify = useToast()

  const currentCategoryIds = data?.categories.map((item) => item.id) ?? []

  const saveCondition = Object.keys(state.category.value).length > 0 &&
    compareTwoArrays(Object.keys(state.category.value), currentCategoryIds) === false

  const onUpdateCategory = (): void => {
    updateCategory({
      variables: {
        categoryIds: Object.keys(state.category.value),
        skipped: false
      },
      onCompleted () {
        nextStep()
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

  const onSkipCategory = (): void => {
    updateCategory({
      variables: {
        categoryIds: [],
        skipped: true
      },
      onCompleted () {
        dispatch({
          type: 'category',
          value: {}
        })
        nextStep()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error skipping the categories`,
          isClosable: true
        })
      }
    })
  }

  const NextButton = (): JSX.Element => {
    if (saveCondition) {
      return (
        <Button
          onClick={onUpdateCategory}
          colorScheme='green'
          isLoading={isUpdatingCategory}
          size='lg'
        >
          <Trans>
            Save
          </Trans>
        </Button>
      )
    }
    return <FlowBuilderNextButton />
  }

  return (
    <HStack spacing={2}>
      <Button
        onClick={onSkipCategory}
        variant='ghost'
        colorScheme='gray'
        isLoading={isUpdatingCategory}
        size='lg'
      >
        <Trans>
          Skip
        </Trans>
      </Button>
      <NextButton />
    </HStack>
  )
}
