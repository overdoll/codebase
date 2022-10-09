import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

interface Props {
  url: string
  width: string
}

const VideoAction = ({
  url,
  width
}: Props): JSX.Element => {
  return (
    <Flex align='center' justify='center' h='100%' w='100%' margin='auto' padding='25px'>
      <Box
        borderRadius={6}
        bg='dimmers.300'
        m='auto'
        h='100%'
        w={width}
        objectFit='cover'
        disablePictureInPicture
        controlsList='nodownload noremoteplayback noplaybackrate'
        as='video'
        muted
        loop
        playsInline
        autoPlay
        src={url}
      />
    </Flex>
  )
}

export default VideoAction
