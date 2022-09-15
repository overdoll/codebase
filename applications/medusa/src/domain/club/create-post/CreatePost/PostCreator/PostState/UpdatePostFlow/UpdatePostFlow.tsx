import { graphql } from 'react-relay/hooks'
import UploadFlowHeader from '../../../../RootCreatePost/DisposeCreatePost/ResultCreatePost/MetaCreatePost/ContainerCreatePost/UpdateCreatePost/UploadFlowHeader/UploadFlowHeader'
import { useFragment } from 'react-relay'
import type { UpdatePostFlowFragment$key } from '@//:artifacts/UpdatePostFlowFragment.graphql'
import UploadAudienceStep from '../../../../RootCreatePost/DisposeCreatePost/ResultCreatePost/MetaCreatePost/ContainerCreatePost/UpdateCreatePost/UploadFlowSteps/UploadAudienceStep/UploadAudienceStep'
import UploadCategoryStep from '../../../../RootCreatePost/DisposeCreatePost/ResultCreatePost/MetaCreatePost/ContainerCreatePost/UpdateCreatePost/UploadFlowSteps/UploadCategoryStep/UploadCategoryStep'
import UploadReviewStep from '../../../../RootCreatePost/DisposeCreatePost/ResultCreatePost/MetaCreatePost/ContainerCreatePost/UpdateCreatePost/UploadFlowSteps/UploadReviewStep/UploadReviewStep'
import { CategoryIdentifier, CharacterIdentifier, ClubMembers, HeartFull } from '@//:assets/icons/interface'
import { FileMultiple } from '@//:assets/icons/navigation'
import { FlowBuilder, FlowBuilderBody } from '@//:modules/content/PageLayout'
import UploadCharacterStep from '../../../../RootCreatePost/DisposeCreatePost/ResultCreatePost/MetaCreatePost/ContainerCreatePost/UpdateCreatePost/UploadFlowSteps/UploadCharacterStep/UploadCharacterStep'
import { useEffect, useState } from 'react'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import UploadContentStep from '../../../../RootCreatePost/DisposeCreatePost/ResultCreatePost/MetaCreatePost/ContainerCreatePost/UpdateCreatePost/UploadFlowSteps/UploadContentStep/UploadContentStep'
import { useUppyContext } from '@//:modules/content/HookedComponents/Upload'
import CreatePostOpening from '../CreatePostOpening/CreatePostOpening'
import { addContentToUppy } from '../../../../RootCreatePost/DisposeCreatePost/ResultCreatePost/MetaCreatePost/ContainerCreatePost/UpdateCreatePost/UploadFlowSteps/UploadContentStep/UploadContentAdd/UploadContentAdd'
import UploadFlowStickyFooter from '../../../../RootCreatePost/DisposeCreatePost/ResultCreatePost/MetaCreatePost/ContainerCreatePost/UpdateCreatePost/UploadFlowFooter/UploadFlowStickyFooter/UploadFlowStickyFooter'

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
    content {
      resource {
        id
      }
    }
    ...UploadFlowHeaderFragment
    ...UploadReviewStepFragment
    ...UploadContentStepFragment
    ...UploadCategoryStepFragment
    ...ProcessContentDisplayFragment
    ...PostContentPreviewMemoPostFragment
    ...UploadFlowStickyFooterFragment
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
    // push all content into uppy on post load
    addContentToUppy(uppy, data.content)

    setLoaded(true)
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
      <UploadFlowStickyFooter query={data} />
    </FlowBuilder>
  )
}
