import { graphql, useFragment } from 'react-relay'
import { PreviewMediaOldFragment$key } from '@//:artifacts/PreviewMediaOldFragment.graphql'
import ImageSnippet from '../../../../../DataDisplay/ImageSnippet/ImageSnippet'
import ControlledVideo from '../../ControlledVideo/ControlledVideo'
import { useContext } from 'react'
import { GlobalVideoManagerContext } from '../../../../index'

interface Props {
  query: PreviewMediaOldFragment$key
  onClose: () => void
}

const Fragment = graphql`
  fragment PreviewMediaOldFragment on Resource {
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

  if (data.type === 'IMAGE') {
    return (
      <ImageSnippet
        onClick={onClose}
        hideBackground
        containCover
        cover
        keepWidth
        style={{
          height: '100%'
        }}
        query={data}
      />
    )
  }

  return (
    <ControlledVideo
      hideBackground
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
}
