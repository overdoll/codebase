import { graphql, useFragment } from 'react-relay'
import { PreviewMediaFragment$key } from '@//:artifacts/PreviewMediaFragment.graphql'
import ImageSnippet from '@//:modules/content/DataDisplay/ImageSnippet/ImageSnippet'
import ControlledVideo from '@//:modules/content/Posts/components/PostPlayback/ControlledVideo/ControlledVideo'
import { useContext } from 'react'
import { GlobalVideoManagerContext } from '@//:modules/content/Posts'

interface Props {
  query: PreviewMediaFragment$key
}

const Fragment = graphql`
  fragment PreviewMediaFragment on Resource {
    type
    ...ImageSnippetFragment
    ...ControlledVideoFragment
  }
`

export default function PreviewMedia ({
  query
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
        return <ImageSnippet containCover cover query={data} />
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
