import { graphql } from 'react-relay/hooks'
import UploadFlowHeader from './UploadFlowHeader/UploadFlowHeader'
import { useFragment } from 'react-relay'
import type { UpdatePostFlowFragment$key } from '@//:artifacts/UpdatePostFlowFragment.graphql'
import UploadAudienceStep from './UploadFlowSteps/UploadAudienceStep/UploadAudienceStep'
import UploadCategoryStep from './UploadFlowSteps/UploadCategoryStep/UploadCategoryStep'
import UploadArrangeStep from './UploadFlowSteps/UploadArrangeStep/UploadArrangeStep'
import UploadReviewStep from './UploadFlowSteps/UploadReviewStep/UploadReviewStep'
import { CategoryIdentifier, CharacterIdentifier, ClubMembers, HeartFull } from '@//:assets/icons/interface'
import { FileMultiple } from '@//:assets/icons/navigation'
import { FlowBuilder, FlowBuilderBody, FlowBuilderFooter } from '@//:modules/content/PageLayout'
import UploadFlowFooter from './UploadFlowFooter/UploadFlowFooter'
import UploadCharacterStep from './UploadFlowSteps/UploadCharacterStep/UploadCharacterStep'
import { useEffect } from 'react'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import { isProcessed } from './UploadFlowHeader/ProcessContent/RefreshProcessContent/RefreshProcessContent'

interface Props {
  query: UpdatePostFlowFragment$key
}

const Fragment = graphql`
  fragment UpdatePostFlowFragment on Post {
    content {
      id
      isSupporterOnly
      viewerCanViewSupporterOnlyContent
      resource {
        processed
        failed
      }
    }
    audience {
      id
      title
    }
    characters {
      id
      name
    }
    categories {
      id
      title
    }
    ...UploadFlowHeaderFragment
    ...UploadFlowFooterFragment
    ...UploadReviewStepFragment
    ...UploadArrangeStepFragment
    ...UploadCategoryStepFragment
  }
`

export default function UpdatePostFlow ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { dispatch } = useSequenceContext()

  const steps = ['arrange', 'audience', 'category', 'character', 'review']
  const components = {
    arrange: <UploadArrangeStep query={data} />,
    audience: <UploadAudienceStep />,
    category: <UploadCategoryStep query={data} />,
    character: <UploadCharacterStep />,
    review: <UploadReviewStep query={data} />
  }
  const headers = {
    arrange: {
      title: 'Arrange Uploads',
      icon: FileMultiple
    },
    audience: {
      title: 'Select Audience',
      icon: ClubMembers
    },
    category: {
      title: 'Add Categories',
      icon: CategoryIdentifier
    },
    character: {
      title: 'Add Character',
      icon: CharacterIdentifier
    },
    review: {
      title: 'Review Post',
      icon: HeartFull
    }
  }

  const contentIsProcessed = isProcessed(data?.content)

  // push all post data into state on post load
  useEffect(() => {
    dispatch({
      type: 'content',
      value: data.content.map((item) => item.id),
      transform: 'SET'
    })
    dispatch({
      type: 'audience',
      value: data?.audience?.id != null
        ? {
            [data?.audience?.id]: data?.audience?.title
          }
        : {},
      transform: 'SET'
    })
    dispatch({
      type: 'characters',
      value: data?.characters.reduce((accum, item) => ({
        ...accum,
        [item.id]: { name: item.name }
      }), {}),
      transform: 'SET'
    })
    dispatch({
      type: 'categories',
      value: data?.categories.reduce((accum, item) => ({
        ...accum,
        [item.id]: { title: item.title }
      }), {}),
      transform: 'SET'
    })
    dispatch({
      type: 'isProcessing',
      value: !contentIsProcessed,
      transform: 'SET'
    })
  }, [])

  return (
    <FlowBuilder
      colorScheme='teal'
      stepsArray={steps}
      stepsComponents={components}
      stepsHeaders={headers}
    >
      <UploadFlowHeader query={data} />
      <FlowBuilderBody />
      <FlowBuilderFooter>
        {({
          currentStep,
          isAtStart,
          nextStep
        }) => (
          <UploadFlowFooter
            step={currentStep}
            isAtStart={isAtStart}
            nextStep={nextStep}
            query={data}
          />
        )}
      </FlowBuilderFooter>
    </FlowBuilder>
  )
}
