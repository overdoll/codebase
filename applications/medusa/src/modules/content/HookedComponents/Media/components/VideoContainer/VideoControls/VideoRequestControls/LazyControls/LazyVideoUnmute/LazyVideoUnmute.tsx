import { PlayerType } from '../../../../../../types'
import dynamic from 'next/dynamic'
import { VideoControlTypeProps } from '../../../../VideoContainer'

const Lazy = dynamic(
  async () => {
    return await import('./VideoUnmute/VideoUnmute')
  }
)

interface Props extends Pick<VideoControlTypeProps, 'hasAudio'> {
  player: PlayerType
  unMuteCallback?: () => void
}

export default function LazyVideoUnmute (props: Props): JSX.Element {
  const {
    player,
    hasAudio,
    unMuteCallback
  } = props

  if (!hasAudio) {
    return <></>
  }

  return (
    <Lazy player={player} unMuteCallback={unMuteCallback} />
  )
}
