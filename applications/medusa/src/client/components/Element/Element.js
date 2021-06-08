/**
 * @flow
 */
import type { Node } from 'react'
import { Image, Flex, Text } from '@chakra-ui/react'

type Props = {
  selected: boolean,
  onSelect?: () => void,
  thumbnail?: string,
  title?: string,
  subheader?: string,
};

export default function Element ({
  selected,
  onSelect,
  thumbnail,
  title,
  subheader
}: Props): Node {
  return (
    <Flex
      role='button'
      w={[150, 200, 150]}
      h={[180, 220, 200]}
      onClick={onSelect}
      borderRadius={10}
      borderWidth={2}
      borderStyle='solid'
      borderColor={selected ? 'green.500' : 'transparent'}
      position='relative'
      objectFit='cover'
      overflow='hidden'
      align='center'
      cursor={onSelect ? 'pointer' : 'auto'}
      userSelect='none'
    >
      <Flex h='100%' w='100%' position='relative'>
        <Image
          alt={title}
          src={thumbnail}
          w='100%'
          h='100%'
          objectFit='cover'
        />
        <Flex
          bg='dimmers.500'
          position='absolute'
          w='100%'
          h='100%'
          align='center'
          justify='center'
          textAlign='center'
          direction='column'
        >
          <Text color='gray.00' fontSize='xl' ml={1} mr={1} wordBreak='break-all'>
            {title}
          </Text>
          {subheader &&
            <Text color='gray.100' fontSize='md' ml={1} mr={1} wordBreak='break-all'>
              {subheader}
            </Text>}
        </Flex>
      </Flex>
    </Flex>
  )
}
