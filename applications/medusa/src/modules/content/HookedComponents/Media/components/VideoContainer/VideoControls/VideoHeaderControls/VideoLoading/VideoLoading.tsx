import { Box, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

interface Props {
  player: any
}

export default function VideoLoading (props: Props): JSX.Element {
  const {
    player
  } = props

  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (player == null) return

    const onCanPlay = (): void => {
      setLoading(false)
    }

    const onWaiting = (): void => {
      setLoading(false)
    }

    player.on('canplay', onCanPlay)
    player.on('waiting', onWaiting)
    return () => {
      player.off('canplay', onCanPlay)
      player.off('waiting', onWaiting)
    }
  }, [player])

  if (!isLoading) {
    return (
      <Box px={2} bg='dimmers.300' borderRadius='full'>
        <Heading color='whiteAlpha.900' fontSize='sm'>
          123
        </Heading>
      </Box>
    )
  }

  return (
    <Box px={2} bg='dimmers.300' borderRadius='full'>
      <BeatLoader color='white' size={6} />
    </Box>
  )
}
