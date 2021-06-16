/**
 * @flow
 */
import type { Node } from 'react'
import {
  Flex,
  Spinner,
  CircularProgress,
  CircularProgressLabel,
  Skeleton,
  Box
} from '@chakra-ui/react'

import Icon from '@//:modules/content/icon/Icon'

import ComputerWebcamVideo
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/computer-devices/webcam/computer-webcam-video.svg'
import ImageCamera1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/images-photography/camera/image-camera-1.svg'

import SuspenseImage from '@//:modules/utilities/SuspenseImage'

type Props = {
  thumbnail: string,
  progress: {
    key: {
      key: number
    }
  },
  type?: string,
};

export default function Thumbnail ({ thumbnail, progress, type }: Props): Node {
  return (
    <Flex
      w='100%'
      h='100%'
      justify='center'
      align='center'
      position='relative'
    >
      <SuspenseImage
        w='100%'
        h='100%'
        objectFit='cover'
        borderRadius={5} src={thumbnail} fallback={<Skeleton w='100%' h='100%' />}
      />
      <Flex
        position='absolute'
        bg={
          progress
            ? (progress['0'] !== progress['1'] && 'dimmers.200': 'transparent')
            : 'transparent'
        }
        w='100%'
        h='100%'
      >
        {progress
          ? (
              progress['0'] !== progress['1'] && (
                <Flex w='100%' h='100%' justifyContent='center' alignItems='center'>
                  <CircularProgress
                    value={(progress['0'] / progress['1']) * 100}
                    color='teal.500'
                    size='xl'
                  >
                    <CircularProgressLabel>
                      {(progress['0'] / progress['1']) * 100}
                    </CircularProgressLabel>
                  </CircularProgress>
                </Flex>
              )
            )
          : (
            <Flex w='100%' h='100%' justifyContent='center' alignItems='center'>
              <Spinner size='xl' />
            </Flex>
            )}
      </Flex>
      <Flex
        position='absolute'
        w='100%'
        h='100%'
        justify='center'
        align='center'

      >
        <Box borderRadius={15} bg='dimmers.500'>
          <Icon m={2} icon={type === 'video' ? ComputerWebcamVideo : ImageCamera1} fill='gray.00' w={8} h={8} />
        </Box>
      </Flex>
    </Flex>
  )
}
