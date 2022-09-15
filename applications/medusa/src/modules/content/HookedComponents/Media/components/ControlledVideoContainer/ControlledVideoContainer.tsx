import VideoContainer, { VideoContainerProps } from '../VideoContainer/VideoContainer'
import { useState } from 'react'
import { OnPlayerInitType, PlayerType } from '../../types'
import { Flex } from '@chakra-ui/react'
import useObserveVideo from '../../support/useObserveVideo'
import useVideoStorageManager from '../../support/useVideoStorageManager'

interface Props extends Omit<VideoContainerProps, 'volume' | 'muted' | 'onPlayerInit'> {
}

export default function ControlledVideoContainer (props: Props): JSX.Element {
  const [player, setPlayer] = useState<PlayerType | null>(null)

  const {
    ref,
    isObserving,
    isObservingDebounced
  } = useObserveVideo({})

  const {
    volume,
    muted,
    updateVolume,
    updateMuted
  } = useVideoStorageManager()

  const setPlayers: OnPlayerInitType = (player) => {
    setPlayer(player)
  }

  return (
    <Flex
      ref={ref}
      w='100%'
      h='100%'
      align='center'
      justify='center'
      borderRadius='inherit'
    >
      <VideoContainer
        onPlayerInit={setPlayers}
        volume={volume}
        muted={muted}
        {...props}
      />
    </Flex>
  )
}
