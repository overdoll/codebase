import { Box, BoxProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

interface Props extends BoxProps {

}

const VideoBox = forwardRef<any, Props>((props: Props, forwardRef): JSX.Element => {
  return (
    <Box
      ref={forwardRef}
      style={{
        width: '100%',
        height: '100%'
      }}
      {...props}
    />
  )
})

export default VideoBox
