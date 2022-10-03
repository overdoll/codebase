import { OnPlayerInitType, PlayerType } from '../../types'
import { useEffect, useState } from 'react'
import StorageVideoContainer, { StorageVideoProps } from './StorageVideoContainer/StorageVideoContainer'
import useObserveVideo, { UseObserveVideoProps } from '../../support/useObserveVideo'
import { Flex } from '@chakra-ui/react'
import { pauseVideo, playVideo, startOrPlayVideo } from '../../support/controls'
import { usePageVisibility } from '../../../../../hooks/usePageVisibility'
import { useUpdateEffect } from 'usehooks-ts'

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
  const [playRejected, setPlayRejected] = useState(false)

  const setPlayers: OnPlayerInitType = (player) => {
    setPlayer(player)
    onPlayerInit?.(player)
  }

  const {
    ref,
    isObserving
  } = useObserveVideo({ ...restObserver })

  const isVisible = usePageVisibility()

  // TODO experiment with destroying the player after the user scrolls away and doesn't play the video for a while
  // TODO this needs a rewrite but it would take too long

  // pause video when user tabs out
  useUpdateEffect(() => {
    if (player == null || !player.hasStart) return
    if (!player.video.paused && !isVisible) {
      pauseVideo(player)
    }
  }, [isVisible, player])

  // play video if it hasn't been loaded yet, and you're focused into it
  useEffect(() => {
    if (player != null && !player.hasStart && isObserving && isActive) {
      startOrPlayVideo(player, true)
    }
  }, [isObserving, isActive, player])

  // play video when you scroll into it, slide is active, and it is paused
  useEffect(() => {
    if (player == null || !player.hasStart) return
    if (isObserving && isActive && player.video.paused) {
      playVideo(player, true)
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
    if (isObserving) return
    const onPlay = (): void => {
      player.off('scroll-play', onPlay)
      if (!isObserving) {
        pauseVideo(player)
      }
    }

    player.on('scroll-play', onPlay)
    return () => {
      player.off('scroll-play', onPlay)
    }
  }, [isObserving, player])

  // autoplay failure capture
  useEffect(() => {
    if (player == null) return
    const onAutoplayFailure = (): void => {
      setPlayRejected(true)
    }
    const onPlay = (): void => {
      setPlayRejected(false)
    }

    player.on('autoplay-failure', onAutoplayFailure)
    player.on('play', onPlay)
    return () => {
      player.off('autoplay-failure', onAutoplayFailure)
      player.off('play', onPlay)
    }
  }, [player])

  // if autoplay was rejected, a click anywhere will play the video
  useEffect(() => {
    if (player == null || !playRejected || !isObserving) return

    const onClick = (): void => {
      playVideo(player)
    }

    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [player, playRejected, isObserving])

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
        storageProps={{
          isObserving
        }}
      />
    </Flex>
  )
}
