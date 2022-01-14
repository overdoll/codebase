import { ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'

interface Props {
  leftItem?: ReactNode | undefined
  centerItem?: ReactNode | undefined
  rightItem?: ReactNode | undefined

}

export default function PostFooter ({
  leftItem,
  centerItem,
  rightItem
}: Props): JSX.Element {
  // TODO make bullet sizing dynamic if there is more than 4
  // TODO like swiper does
  // TODO bullets should also be bigger

  return (
    <Box position='relative'>
      <Flex justify='space-between' align='center'>
        <Flex h='100%' align='center' justify='flex-start'>
          {leftItem != null && leftItem}
        </Flex>
        <Flex h='100%' align='center' justify='flex-end'>
          {rightItem != null && rightItem}
        </Flex>
      </Flex>
      <Flex
        pointerEvents='none'
        position='absolute'
        w='100%'
        top={0}
        right={0}
        left={0}
        h='100%'
        align='center'
        justify='center'
      >
        {centerItem != null && centerItem}
      </Flex>
    </Box>

  )
}
