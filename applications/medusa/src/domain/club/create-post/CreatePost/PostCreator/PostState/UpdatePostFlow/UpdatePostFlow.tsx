import { graphql } from 'react-relay/hooks'
import UploadFlowHeader from './UploadFlowHeader/UploadFlowHeader'
import { useFragment } from 'react-relay'
import type { UpdatePostFlowFragment$key } from '@//:artifacts/UpdatePostFlowFragment.graphql'
import UploadAudienceStep from './UploadFlowSteps/UploadAudienceStep/UploadAudienceStep'
import UploadCategoryStep from './UploadFlowSteps/UploadCategoryStep/UploadCategoryStep'
import UploadReviewStep from './UploadFlowSteps/UploadReviewStep/UploadReviewStep'
import { CategoryIdentifier, CharacterIdentifier, ClubMembers, HeartFull } from '@//:assets/icons/interface'
import { FileMultiple } from '@//:assets/icons/navigation'
import { FlowBuilder, FlowBuilderBody, FlowBuilderFooter } from '@//:modules/content/PageLayout'
import UploadFlowFooter from './UploadFlowFooter/UploadFlowFooter'
import UploadCharacterStep from './UploadFlowSteps/UploadCharacterStep/UploadCharacterStep'
import { useEffect, useState } from 'react'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import UploadContentStep from './UploadFlowSteps/UploadContentStep/UploadContentStep'
import { useUppyContext } from '@//:modules/content/HookedComponents/Upload'
import CreatePostOpening from '../CreatePostOpening/CreatePostOpening'
import { Flex } from '@chakra-ui/react'

interface Props {
  query: UpdatePostFlowFragment$key
}

const Fragment = graphql`
  fragment UpdatePostFlowFragment on Post {
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
    ...UploadContentStepFragment
    ...UploadCategoryStepFragment
    ...ProcessContentDisplayFragment
    ...PostContentPreviewMemoPostFragment
  }
`

export default function UpdatePostFlow ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const uppy = useUppyContext()

  const [loaded, setLoaded] = useState(false)

  const { dispatch } = useSequenceContext()

  const steps = ['content', 'audience', 'category', 'character', 'review']
  const components = {
    content: <UploadContentStep query={data} />,
    audience: <UploadAudienceStep />,
    category: <UploadCategoryStep query={data} />,
    character: <UploadCharacterStep />,
    review: <UploadReviewStep query={data} />
  }
  const headers = {
    content: {
      title: 'Modify Content',
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

  // push all post data into state on post load
  useEffect(() => {
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
    setLoaded(true)
  }, [])

  useEffect(() => {
    return () => {
      uppy.reset()
    }
  }, [])

  // we check for this state otherwise upon refresh, the dom will dismount and cause test errors
  if (!loaded) {
    return <CreatePostOpening />
  }

  return (
    <FlowBuilder
      colorScheme='teal'
      stepsArray={steps}
      stepsComponents={components}
      stepsHeaders={headers}
    >
      <UploadFlowHeader query={data} />
      <FlowBuilderBody />
      <Flex w='100%'>
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
      </Flex>
    </FlowBuilder>
  )
}
