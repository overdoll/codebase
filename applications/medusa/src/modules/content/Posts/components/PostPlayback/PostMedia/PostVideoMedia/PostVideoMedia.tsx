import { graphql, useFragment } from 'react-relay'
import { useContext, useState } from 'react'
import { PostVideoMediaFragment$key } from '@//:artifacts/PostVideoMediaFragment.graphql'
import ControlledVideo, {
  ControlledVideoProps
} from '../../ControlledVideo/ControlledVideo'
import { GlobalVideoManagerContext } from '../../../../index'
import ObserveVideo from '../../ObserveVideo/ObserveVideo'

interface Props extends Pick<ControlledVideoProps, 'controls'> {
  query: PostVideoMediaFragment$key
}

const Fragment = graphql`
  fragment PostVideoMediaFragment on Resource {
    ...ControlledVideoFragment
  }
`

export default function PostVideoMedia ({
  query,
  controls
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    videoMuted,
    videoVolume,
    changeVideoMuted,
    changeVideoVolume
  } = useContext(GlobalVideoManagerContext)

  const [video, setVideo] = useState<HTMLVideoElement | null>(null)

  const onInitialize = (e): void => {
    setVideo(e)
  }

  return (
    <ObserveVideo video={video}>
      <ControlledVideo
        controls={controls}
        onInitialize={(target) => onInitialize(target)}
        onVolumeChange={(volume) => changeVideoVolume(volume)}
        onMute={(muted) => changeVideoMuted(muted)}
        volume={videoVolume}
        isMuted={videoMuted}
        query={data}
      />
    </ObserveVideo>
  )
}
