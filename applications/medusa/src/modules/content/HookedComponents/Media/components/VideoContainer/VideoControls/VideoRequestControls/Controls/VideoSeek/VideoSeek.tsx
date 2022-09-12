import { ControlFastForward } from '@//:assets/icons'
import MediaButton from '../../../../../MediaButton/MediaButton'
import { VideoControlTypeProps } from '../../../../VideoContainer'

interface Props extends Pick<VideoControlTypeProps, 'duration'> {
  seekCallback?: () => void
}

export default function VideoSeek (props: Props): JSX.Element {
  const {
    seekCallback,
    duration
  } = props

  if (duration <= 10) {
    return <></>
  }

  return (
    <MediaButton
      onClick={() => {
        seekCallback?.()
      }}
      icon={ControlFastForward}
    />
  )
}
