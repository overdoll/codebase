/**
 * @flow
 */
import type { Node } from 'react';
import { Image, Container, Flex, Box, Text, Heading } from '@chakra-ui/react';

type Props = {
  selected: boolean,
  onSelect: any,
  thumbnail?: string,
  title?: string,
};

export default function Element({
  selected,
  onSelect,
  thumbnail,
  title,
}: Props): Node {
  return (
    <Flex
      w={[150, 200, 150]}
      h={[180, 220, 200]}
      onClick={onSelect}
      borderRadius={10}
      borderWidth={2}
      borderStyle="solid"
      borderColor={selected ? 'green.500' : 'transparent'}
      position="relative"
      objectFit="cover"
      overflow="hidden"
      align="center"
    >
      <Flex position="relative">
        <Image
          alt={!!title}
          src={thumbnail}
          w="100%"
          h="100%"
          objectFit="cover"
        />
        <Flex
          bg="dimmers.500"
          position="absolute"
          w="100%"
          h="100%"
          align="center"
          justify="center"
        >
          <Heading color="gray.00" size="md">
            {title}
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
}
