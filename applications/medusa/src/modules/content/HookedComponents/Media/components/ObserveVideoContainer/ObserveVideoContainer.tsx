import { OnPlayerInitType, PlayerType } from '../../types'
import { useEffect, useState } from 'react'
import StorageVideoContainer, { StorageVideoProps } from './StorageVideoContainer/StorageVideoContainer'
import useObserveVideo, { UseObserveVideoProps } from '../../support/useObserveVideo'
import { Flex } from '@chakra-ui/react'
import { pauseVideo, playVideo, startOrPlayVideo } from '../../support/controls'

interface ObserveVideoProps extends UseObserveVideoProps {
  isActive: boolean
}

export interface ObserveVideoContainerProps {
  videoProps: StorageVideoProps
  observerProps: ObserveVideoProps
}

export default function ObserveVideoContainer (props: ObserveVideoContainerProps): JSX.Element {
  const {
    videoProps,
    observerProps
  } = props

  const {
    onPlayerInit,
    ...restVideo
  } = videoProps

  const {
    isActive,
    ...restObserver
  } = observerProps

  const [player, setPlayer] = useState<PlayerType | null>(null)

  const setPlayers: OnPlayerInitType = (player) => {
    setPlayer(player)
    onPlayerInit?.(player)
  }

  const {
    ref,
    isObserving
  } = useObserveVideo({ ...restObserver })

  // TODO experiment with destroying the player after the user scrolls away and doesn't play the video for a while

  // play video if it hasn't been loaded yet, and you're focused into it
  useEffect(() => {
    if (player != null && !player.hasStart && isObserving && isActive) {
      startOrPlayVideo(player)
    }
  }, [isObserving, isActive, player])

  // play video when you scroll into it, slide is active, and it is paused
  useEffect(() => {
    if (player == null || !player.hasStart) return
    if (isObserving && isActive && player.video.paused) {
      playVideo(player)
    }
  }, [isObserving, isActive, player])

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

  // if video autoplays after you scroll away (for example, after buffering), we pause the video
  useEffect(() => {
    if (player == null) return

    const onPlay = (): void => {
      if (!isObserving) {
        pauseVideo(player)
      }
    }

    player.on('play', onPlay)

    return () => {
      player.off('play', onPlay)
    }
  }, [isObserving, player])

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
        videoProps={{
          onPlayerInit: setPlayers,
          ...restVideo
        }}
      />
    </Flex>
  )
}
