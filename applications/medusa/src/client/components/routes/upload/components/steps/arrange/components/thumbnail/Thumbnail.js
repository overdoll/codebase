/**
 * @flow
 */
import type { Node } from 'react';
import {
  Flex,
  Spinner,
  CircularProgress,
  CircularProgressLabel,
  Skeleton,
  Image,
} from '@chakra-ui/react';

type Props = {
  thumbnail: any,
  progress: any,
};

export default function Thumbnail({ thumbnail, progress }: Props): Node {
  return (
    <Flex
      w="100%"
      h="100%"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      {thumbnail ? (
        <Image
          alt="thumbnail"
          src={thumbnail}
          w="100%"
          h="100%"
          objectFit="cover"
          borderRadius={5}
        />
      ) : (
        <Skeleton w="100%" h="100%" />
      )}
      <Flex
        position="absolute"
        bg={
          progress
            ? (progress['0'] !== progress['1'] && 'dimmers.200': 'transparent')
            : 'transparent'
        }
        w="100%"
        h="100%"
      >
        {progress ? (
          progress['0'] !== progress['1'] && (
            <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
              <CircularProgress
                value={(progress['0'] / progress['1']) * 100}
                color="teal.500"
                size="xl"
              >
                <CircularProgressLabel>
                  {(progress['0'] / progress['1']) * 100}
                </CircularProgressLabel>
              </CircularProgress>
            </Flex>
          )
        ) : (
          <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
            <Spinner size="xl" />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
