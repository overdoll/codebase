import { graphql, useFragment } from 'react-relay'
import 'swiper/swiper.min.css'
import { useContext } from 'react'
import { PostMediaFragment$key } from '@//:artifacts/PostMediaFragment.graphql'
import ImageSnippet from '../../../DataDisplay/ImageSnippet/ImageSnippet'
import ControlledVideo from './ControlledVideo/ControlledVideo'
import { PostVideoManagerContext } from '../../helpers/PostVideoManager/PostVideoManager'
import { GlobalVideoManagerContext } from '../../helpers/GlobalVideoManager/GlobalVideoManager'

export interface PostMediaProps {
  index: number
  reference: string
}

interface Props extends PostMediaProps {
  query: PostMediaFragment$key

}

const Fragment = graphql`
  fragment PostMediaFragment on Resource {
    type
    ...ImageSnippetFragment
    ...ControlledVideoFragment
  }
`

export default function PostMedia ({
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
