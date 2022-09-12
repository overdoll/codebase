import { PlayerType } from '../../../../../../types'
import dynamic from 'next/dynamic'
import { VideoControlTypeProps } from '../../../../VideoContainer'

const Lazy = dynamic(
  async () => {
    return await import('./VideoSimpleSeek/VideoSimpleSeek')
  }
)

interface Props extends Pick<VideoControlTypeProps, 'duration'> {
  player: PlayerType
}

export default function LazyVideoSimpleSeek (props: Props): JSX.Element {
  const {
    player,
    duration
  } = props

  if (duration < 15) {
    return <></>
  }

  return (
    <Lazy player={player} duration={duration} />
  )
}
