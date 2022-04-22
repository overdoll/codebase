import { graphql, useFragment } from 'react-relay'
import { useContext } from 'react'
import { PostFullMediaFragment$key } from '@//:artifacts/PostFullMediaFragment.graphql'
import ImageSnippet from '../../../../DataDisplay/ImageSnippet/ImageSnippet'
import ControlledVideo from '../ControlledVideo/ControlledVideo'
import { PostVideoManagerContext } from '../../../support/PostVideoManager/PostVideoManager'
import { GlobalVideoManagerContext } from '../../../support/GlobalVideoManager/GlobalVideoManager'

export interface PostMediaProps {
  index: number
  reference: string
}

interface Props extends PostMediaProps {
  query: PostFullMediaFragment$key

}

const Fragment = graphql`
  fragment PostFullMediaFragment on Resource {
    type
    ...ImageSnippetFragment
    ...ControlledVideoFragment
  }
`

export default function PostFullMedia ({
  query,
  index,
  reference
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    changeVideoVolume,
    changeVideoMuted,
    onVideoPlay,
    videoMuted,
    videoVolume
  } = useContext(GlobalVideoManagerContext)

  const {
    onVideoInitialize
  } = useContext(PostVideoManagerContext)

  if (data.type === 'IMAGE') {
    return <ImageSnippet objectFit='contain' query={data} />
  }

  if (data.type === 'VIDEO') {
    return (
      <ControlledVideo
        onPlay={(paused, target) => onVideoPlay(reference, paused, target)}
        onPause={(paused, target) => onVideoPlay(reference, paused, target)}
        onInitialize={(target) => onVideoInitialize(target, index)}
        volume={videoVolume}
        isMuted={videoMuted}
        onMute={changeVideoMuted}
        onVolumeChange={changeVideoVolume}
        query={data}
      />
    )
  }

  return <></>
}
