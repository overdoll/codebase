import { graphql, useFragment } from 'react-relay'
import { useContext } from 'react'
import { PostSimpleMediaFragment$key } from '@//:artifacts/PostSimpleMediaFragment.graphql'
import ImageSnippet from '../../../../DataDisplay/ImageSnippet/ImageSnippet'
import ControlledVideo from '../ControlledVideo/ControlledVideo'
import { PostVideoManagerContext } from '../../../support/PostVideoManager/PostVideoManager'
import { GlobalVideoManagerContext } from '../../../support/GlobalVideoManager/GlobalVideoManager'
import { PostMediaProps } from '../PostFullMedia/PostFullMedia'

interface Props extends PostMediaProps {
  query: PostSimpleMediaFragment$key
}

const Fragment = graphql`
  fragment PostSimpleMediaFragment on Resource {
    type
    ...ImageSnippetFragment
    ...ControlledVideoFragment
  }
`

export default function PostSimpleMedia ({
  query,
  index,
  reference
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    onVideoPlay,
    videoMuted,
    videoVolume
  } = useContext(GlobalVideoManagerContext)

  const {
    onVideoInitialize
  } = useContext(PostVideoManagerContext)

  if (data.type === 'IMAGE') {
    return <ImageSnippet objectFit='cover' query={data} />
  }

  if (data.type === 'VIDEO') {
    return (
      <ControlledVideo
        controls={{
          canControl: false
        }}
        onPlay={(paused, target) => onVideoPlay(reference, paused, target)}
        onPause={(paused, target) => onVideoPlay(reference, paused, target)}
        onInitialize={(target) => onVideoInitialize(target, index)}
        volume={videoVolume}
        isMuted={videoMuted}
        query={data}
      />
    )
  }

  return <></>
}
