import { VideoContainerProps } from '../VideoContainer/VideoContainer'
import { OnPlayerInitType, PlayerType } from '../../types'
import { useEffect, useState } from 'react'
import StorageVideoContainer from './StorageVideoContainer/StorageVideoContainer'
import useObserveVideo from '../../support/useObserveVideo'
import { Flex } from '@chakra-ui/react'
import { pauseVideo, playVideo, startOrPlayVideo } from '../../support/controls'
import syncPlayerPlayPause from '../../support/syncPlayerPlayPause'

export interface ObserveVideoContainerProps {
  isActive: boolean
}

interface Props extends Omit<VideoContainerProps, 'volume' | 'muted'>, ObserveVideoContainerProps {
  onPlayerInit?: OnPlayerInitType
}

export default function ObserveVideoContainer (props: Props): JSX.Element {
  const {
    onPlayerInit,
    isActive,
    autoPlay,
    ...rest
  } = props

  const [player, setPlayer] = useState<PlayerType | null>(null)

  const setPlayers: OnPlayerInitType = (player) => {
    setPlayer(player)
    onPlayerInit?.(player)
  }

  const {
    ref,
    isObserving,
    isObservingDebounced
  } = useObserveVideo({})

  // play video if it hasn't been loaded yet, and you're focused into it
  useEffect(() => {
    if (player != null && !player.hasStart && autoPlay !== true && isObservingDebounced && isActive) {
      startOrPlayVideo(player)
    }
  }, [isObservingDebounced, isActive, player, autoPlay])

  // play video when you scroll into it, slide is active, and it is paused
  useEffect(() => {
    if (player == null || !player.hasStart) return
    if (isObservingDebounced && isActive && player.video.paused) {
      playVideo(player)
    }
  }, [isObservingDebounced, isActive, player])

  // pause video when you're scrolled into it, slide is not active, and it is paused
  useEffect(() => {
    if (player == null || !player.hasStart) return
    if (isObserving && !isActive && !player.video.paused) {
      pauseVideo(player)
    }
  }, [isObserving, isActive, player])

  // pause video when you scroll away
  useEffect(() => {
    if (player == null || !player.hasStart) return
    if (!isObserving && !player.video.paused) {
      pauseVideo(player)
    }
  }, [isObserving, player])

  // keep track of video states
  syncPlayerPlayPause(player, () => {
  }, setPlayer)

  return (
    <Flex
      ref={ref}
      w='100%'
      h='100%'
      align='center'
      justify='center'
      borderRadius='inherit'
    >
      <StorageVideoContainer
        autoPlay={isActive && autoPlay === true}
        onPlayerInit={setPlayers}
        {...rest}
      />
    </Flex>
  )
}
