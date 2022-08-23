import { graphql, useFragment } from 'react-relay'
import { PreviewMediaFragment$key } from '@//:artifacts/PreviewMediaFragment.graphql'
import ImageSnippet from '../../../../../DataDisplay/ImageSnippet/ImageSnippet'
import ControlledVideo from '../../ControlledVideo/ControlledVideo'
import { useContext } from 'react'
import { GlobalVideoManagerContext } from '../../../../index'

interface Props {
  query: PreviewMediaFragment$key
  onClose: () => void
}

const Fragment = graphql`
  fragment PreviewMediaFragment on Resource {
    type
    ...ImageSnippetFragment
    ...ControlledVideoFragment
  }
`

export default function PreviewMedia ({
  query,
  onClose
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    videoMuted,
    videoVolume,
    changeVideoMuted,
    changeVideoVolume
  } = useContext(GlobalVideoManagerContext)

  const DisplayMedia = (): JSX.Element => {
    switch (data.type) {
      case 'IMAGE':
        return (
          <ImageSnippet
            onClick={onClose}
            hideBackground
            containCover
            cover
            query={data}
          />
        )
      case 'VIDEO':
        return (
          <ControlledVideo
            autoPlay
            controls={{
              canSeek: true,
              canFullscreen: true
            }}
            onVolumeChange={(volume) => changeVideoVolume(volume)}
            onMute={(muted) => changeVideoMuted(muted)}
            volume={videoVolume}
            isMuted={videoMuted}
            query={data}
          />
        )
      default:
        return <></>
    }
  }

  return <DisplayMedia />
}
