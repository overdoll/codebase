import DynamicVideo, { CreateVideoProps } from './DynamicVideo/DynamicVideo'
import { useHydrate } from '../../../../../../hydrate'
import { Box, Flex } from '@chakra-ui/react'
import { ReactNode, useEffect, useState } from 'react'
import ContainImage from '../../ImageContainer/ImageWrapper/ContainImage/ContainImage'
import { OnPlayerInitType, PlayerType } from '../../../types'
import { VideoWatchProps } from '../VideoContainer'

export interface VideoWrapperProps {
  poster: ReactNode
  aspectRatio: {
    width: number
    height: number
  }
}

interface Props extends VideoWrapperProps, CreateVideoProps, VideoWatchProps {
  onPlayerInit: OnPlayerInitType
}

export default function VideoWrapper (props: Props): JSX.Element {
  const {
    poster,
    onPlayerInit,
    hlsUrl,
    mp4Url,
    aspectRatio,
    volume,
    muted,
    autoPlay
  } = props

  const isHydrated = useHydrate()
  const [player, setPlayer] = useState<PlayerType | null>(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  const setPlayers: OnPlayerInitType = (player) => {
    setPlayer(player)
    onPlayerInit(player)
  }

  // when video has been played at least once, we hide the thumbnail
  useEffect(() => {
    if (player == null) return
    const onPlay = (): void => {
      setHasPlayed(true)
    }

    player.once('play', onPlay)
    return () => {
      player.off('play', onPlay)
    }
  }, [player])

  // when volume has been changed by other video players, we update this value when video is played
  useEffect(() => {
    if (player == null) return
    const onPlay = (): void => {
      player.volume = volume
    }
    player.once('play', onPlay)
    return () => {
      player.off('play', onPlay)
    }
  }, [volume, player])

  // same as above but for muted property
  useEffect(() => {
    if (player == null) return
    const onPlay = (): void => {
      player.muted = muted
    }
    player.once('play', onPlay)
    return () => {
      player.off('play', onPlay)
    }
  }, [muted, player])

  return (
    <Flex
      align='center'
      justify='center'
      width='100%'
      height='100%'
    >
      <Box w='100%' display='block' paddingBottom={`${(aspectRatio.width / aspectRatio.height) * 100}%`} />
      {!hasPlayed && (
        <Flex position='absolute' height='100%' width='100%'>
          <ContainImage>
            {poster}
          </ContainImage>
        </Flex>
      )}
      <Flex
        width='100%'
        height='100%'
        position='absolute'
        w='100%'
        h='100%'
        top={0}
        left={0}
        bottom={0}
      >
        {isHydrated && (
          <DynamicVideo
            autoPlay={autoPlay}
            volume={volume}
            muted={muted}
            hlsUrl={hlsUrl}
            mp4Url={mp4Url}
            onPlayerInit={(player) => setPlayers(player)}
          />)}
      </Flex>
    </Flex>
  )
}
