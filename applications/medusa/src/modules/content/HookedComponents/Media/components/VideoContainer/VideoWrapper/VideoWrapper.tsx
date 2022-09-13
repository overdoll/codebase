import DynamicVideo, { CreateVideoProps } from './DynamicVideo/DynamicVideo'
import { useHydrate } from '../../../../../../hydrate'
import { Flex, FlexProps } from '@chakra-ui/react'
import { ReactNode, useEffect, useState } from 'react'
import ContainImage from '../../ImageContainer/ImageWrapper/ContainImage/ContainImage'
import { OnPlayerInitType, PlayerType } from '../../../types'

export interface VideoWrapperProps {
  poster: ReactNode
  aspectRatio: {
    width: number
    height: number
  }
}

interface Props extends VideoWrapperProps, CreateVideoProps {
  onPlayerInit: OnPlayerInitType
}

export default function VideoWrapper (props: Props): JSX.Element {
  const {
    poster,
    onPlayerInit,
    hlsUrl,
    mp4Url,
    aspectRatio
  } = props

  const isHydrated = useHydrate()
  const [player, setPlayer] = useState<PlayerType | null>(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  const setPlayers: OnPlayerInitType = (player) => {
    setPlayer(player)
    onPlayerInit(player)
  }

  const FLEX_PROPS: FlexProps = {
    align: 'center',
    justify: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }

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

  // aspect ratio determine box sizing here
  return (
    <Flex
      align='center'
      justify='center'
      position='relative'
      width='100%'
      height='100%'
    >
      {!hasPlayed && (
        <Flex {...FLEX_PROPS}>
          <ContainImage>
            {poster}
          </ContainImage>
        </Flex>
      )}
      <Flex {...FLEX_PROPS}>
        {isHydrated && (
          <DynamicVideo
            hlsUrl={hlsUrl}
            mp4Url={mp4Url}
            onPlayerInit={(player) => setPlayers(player)}
          />)}
      </Flex>
    </Flex>
  )
}
