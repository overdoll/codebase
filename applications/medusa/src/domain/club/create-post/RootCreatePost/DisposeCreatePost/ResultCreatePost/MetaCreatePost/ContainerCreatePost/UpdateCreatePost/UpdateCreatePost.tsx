import { graphql } from 'react-relay/hooks'
import UploadFlowHeader from './UploadFlowHeader/UploadFlowHeader'
import { useFragment } from 'react-relay'
import type { UpdateCreatePostFragment$key } from '@//:artifacts/UpdateCreatePostFragment.graphql'
import UploadAudienceStep from './UploadFlowSteps/UploadAudienceStep/UploadAudienceStep'
import UploadCategoryStep from './UploadFlowSteps/UploadCategoryStep/UploadCategoryStep'
import UploadReviewStep from './UploadFlowSteps/UploadReviewStep/UploadReviewStep'
import { CategoryIdentifier, CharacterIdentifier, ClubMembers, HeartFull } from '@//:assets/icons/interface'
import { FileMultiple } from '@//:assets/icons/navigation'
import { FlowBuilder, FlowBuilderBody, MobileContainer } from '@//:modules/content/PageLayout'
import UploadCharacterStep from './UploadFlowSteps/UploadCharacterStep/UploadCharacterStep'
import { useEffect, useState } from 'react'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import UploadContentStep from './UploadFlowSteps/UploadContentStep/UploadContentStep'
import { useUppyContext } from '@//:modules/content/HookedComponents/Upload'
import { addContentToUppy } from './UploadFlowSteps/UploadContentStep/UploadContentAdd/UploadContentAdd'
import UploadFlowStickyFooter from './UploadFlowFooter/UploadFlowStickyFooter/UploadFlowStickyFooter'
import SuspenseCreatePost from '../../../../SuspenseCreatePost/SuspenseCreatePost'

interface Props {
  query: UpdateCreatePostFragment$key
}

const Fragment = graphql`
  fragment UpdateCreatePostFragment on Post {
    state
    audience {
      id
      title
    }
    characters {
      id
      name
    }
    characterRequests {
      id
      name
    }
    categories {
      id
      title
    }
    content {
      id
    }
    ...UploadFlowHeaderFragment
    ...UploadReviewStepFragment
    ...UploadContentStepFragment
    ...UploadCategoryStepFragment
    ...UploadFlowStickyFooterFragment
    ...UploadCharacterStepFragment
  }
`

export default function UpdateCreatePost ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const uppy = useUppyContext()

  const [loaded, setLoaded] = useState(false)

  const {
    state,
    dispatch
  } = useSequenceContext()

  const steps = ['content', 'audience', 'category', 'character', ...(state.isEditing as boolean ? [] : ['review'])]
  const components = {
    content: <UploadContentStep query={data} />,
    audience: <UploadAudienceStep />,
    category: <UploadCategoryStep query={data} />,
    character: <UploadCharacterStep query={data} />,
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

  useEffect(() => {
    // push all post data into state on post load
    dispatch({
      type: 'audience',
      value: data?.audience?.id != null
        ? {
            [data?.audience?.id]: data?.audience?.title
          }
        : {},
      transform: 'SET'
    })
    const reducedCharacters = data?.characters.reduce((accum, item) => ({
      ...accum,
      [item.id]: {
        name: item.name,
        isRequest: false
      }
    }), {})
    const reducedCharacterRequests = data?.characterRequests.reduce((accum, item) => ({
      ...accum,
      [item.name]: {
        name: item.name,
        isRequest: true
      }
    }), {})

    dispatch({
      type: 'characters',
      value: { ...reducedCharacters, ...reducedCharacterRequests },
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
    if (data?.state !== 'DRAFT') {
      dispatch({
        type: 'isEditing',
        value: true,
        transform: 'SET'
      })
    }
    // push all content into uppy on post load
    addContentToUppy(uppy, data.content)

    setLoaded(true)
  }, [])

  // we check for this state otherwise upon refresh, the dom will dismount and cause test errors
  if (!loaded) {
    return <SuspenseCreatePost />
  }

  return (
    <FlowBuilder
      ignoreStack
      colorScheme='teal'
      stepsArray={steps}
      stepsComponents={components}
      stepsHeaders={headers}
    >
      <MobileContainer pb={4}>
        <UploadFlowHeader query={data} />
      </MobileContainer>
      <FlowBuilderBody ignoreBox />
      <UploadFlowStickyFooter query={data} />
    </FlowBuilder>
  )
}
