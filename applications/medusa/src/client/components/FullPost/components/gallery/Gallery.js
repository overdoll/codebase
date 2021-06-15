/**
 * @flow
 */
import type { Node } from 'react'
import { useState } from 'react'
import {
  useDisclosure,
  Box,
  Flex, IconButton, Skeleton, Spinner

} from '@chakra-ui/react'

import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import InspectModal from '../modal/InspectModal'
import Icon from '@//:modules/content/icon/Icon'

import InterfaceArrowsShrinkVertical
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-shrink-vertical.svg'
import InterfaceArrowsVerticalExpand1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-vertical-expand-1.svg'

import SuspenseImage from '@//:modules/utilities/SuspenseImage'

SwiperCore.use([Navigation])

type Props = {
  files: {
    id: string,
  },
  urls: {
    key: string,
  },
  thumbnails: {
    key: string,
  },
  setSwiper: () => void,
}

export default function Gallery ({ files, urls, thumbnails, setSwiper }: Props): Node {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    isOpen: previewExpand,
    onToggle: setPreviewExpand
  } = useDisclosure()

  const [currentSlide, setSlide] = useState(null)

  return (
    <>
      <Swiper
        centeredSlides
        navigation
        onSlideChange={(swiper) => setSwiper(swiper)}
      >
        {files.map((file) => {
          const content = urls[file.id]

          const fileType = file.type.split('/')[0]

          return (
            <SwiperSlide key={file.id}>
              <Flex
                h='600px'
                position='relative'
                align='center'
                justify='center'
                bg='gray.800'
              >

                <Flex
                  h='100%'
                  position='relative'
                  align='center'
                  justify='center'
                  userSelect='none'
                >
                  {fileType === 'video'
                    ? <video disableRemotePlayback autoPlay muted loop width='100%' poster={thumbnails[file.id]}>
                      <source src={urls[file.id]} type={file.type} />
                    </video>
                    : <SuspenseImage
                        alt='thumbnail'
                        h='100%'
                        objectFit='cover'
                        src={content} fallback={<Skeleton w='100%' h='100%' />}
                      />}

                  <Box
                    bg='transparent'
                    w='40%'
                    h='50%'
                    position='absolute'
                    onClick={() => {
                      setSlide(file)
                      onOpen()
                    }}
                  />
                </Flex>

              </Flex>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <InspectModal
        isOpen={isOpen} onClose={onClose}
        supplement={<IconButton
          variant='ghost'
          w='40px'
          h='40px'
          m={2}
          onClick={setPreviewExpand}
          icon={
            <Icon
              icon={!previewExpand ? InterfaceArrowsVerticalExpand1 : InterfaceArrowsShrinkVertical}
              fill='gray.100'
              w={4}
              h={4}
            />
          }
                    />}
      >
        {currentSlide
          ? currentSlide.type.split('/')[0] === 'video'
            ? <video
                disableRemotePlayback
                autoPlay muted controls loop height={!previewExpand ? '100%' : 'auto'}
                width={!previewExpand ? 'auto' : '100%'} objectFit={!previewExpand ? 'contain' : 'cover'}
                poster={thumbnails[currentSlide.id]}
              >
              <source src={urls[currentSlide.id]} type={currentSlide.type} />
            </video>
            : <SuspenseImage
                alt='thumbnail'
                h={!previewExpand ? '100%' : 'auto'}
                w={!previewExpand ? 'auto' : '100%'}
                objectFit={!previewExpand ? 'contain' : 'cover'}
                zIndex='hide'
                src={urls[currentSlide.id]} fallback={<Skeleton w='100%' h='100%' />}
              />
          : <Spinner size='xl' color='red.500' />}

      </InspectModal>
    </>
  )
}
