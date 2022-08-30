import { Flex } from '@chakra-ui/react'

interface Props {
  backgroundColor?: string
  backgroundImage?: string
}

export default function BlurredBackgroundThumbnail (props: Props): JSX.Element {
  const {
    backgroundColor,
    backgroundImage
  } = props

  return (
    <Flex
      left='50%'
      w='10%'
      h='10%'
      transform='scale(11)'
      top='50%'
      opacity={0.5}
      bg='center center / cover no-repeat'
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      filter='blur(2px)'
      position='absolute'
    />
  )
}
