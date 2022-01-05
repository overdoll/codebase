import { Box, HStack } from '@chakra-ui/react'

interface Props {
  length: number
  currentIndex: number
  slidesPerView?: number
}

export default function PostIndexer ({
  length,
  currentIndex,
  slidesPerView = 1,
  ...rest
}: Props): JSX.Element {
  const calculateIndex = (length: number): number => {
    return length - (slidesPerView - 1) < 0 ? 1 : length - (slidesPerView - 1)
  }

  return (
    <HStack
      py={2}
      spacing={1}
      align='center'
      justify='center'
      {...rest}
    >
      {[...Array(calculateIndex(length)).keys()].map((key) => {
        return (
          <Box
            borderWidth={1}
            borderColor='gray.500'
            w={key === currentIndex ? 2 : 1}
            h={key === currentIndex ? 2 : 1}
            bg={key === currentIndex ? 'gray.300' : 'gray.500'}
            borderRadius='base'
            key={key}
          />
        )
      })}
    </HStack>
  )
}
