/**
 * @flow
 */
import type { Node } from 'react'
import { useState, useRef } from 'react'
import {
  useDisclosure,
  Box,
  Flex, IconButton, Skeleton, Spinner

} from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import InspectModal from '../modal/InspectModal'
import Icon from '@//:modules/content/icon/Icon'

import InterfaceArrowsShrinkVertical
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-shrink-vertical.svg'
import InterfaceArrowsVerticalExpand1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-vertical-expand-1.svg'
import ArrowButtonRight2
  from '@streamlinehq/streamlinehq/img/streamline-bold/arrows-diagrams/arrows/arrow-button-right-2.svg'
import ArrowButtonLeft2
  from '@streamlinehq/streamlinehq/img/streamline-bold/arrows-diagrams/arrows/arrow-button-left-2.svg'

import SuspenseImage from '@//:modules/utilities/SuspenseImage'

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

  const [gallerySwiper, setGallerySwiper] = useState(null)

  const swiper = useRef(null)

  const changeSwiper = (swiper) => {
    setSwiper(swiper)
    setGallerySwiper(swiper)
  }

  return (
    <>
      {!swiper
        ? <Skeleton h='600px' />
        : <Flex align='center' position='relative'>
          <Swiper
            ref={swiper}
            centeredSlides
            onSlideChange={(swiper) =>
              changeSwiper(swiper)}
            onInit={(swiper) => {
              setGallerySwiper(swiper)
            }}
          >
            {files.map((file, index) => {
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
                        ? <video
                            disableRemotePlayback controls
                            autoPlay={gallerySwiper ? gallerySwiper.activeIndex === index : 0}
                            muted loop preload='auto' style={{
                              objectFit: 'cover',
                              height: '100%'
                            }} poster={thumbnails[file.id]}
                          >
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
                        display={fileType === 'video' ? 'none' : 'block'}
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
          <Icon
            onClick={() => { gallerySwiper.slidePrev() }}
            display={gallerySwiper ? gallerySwiper.activeIndex === 0 ? 'none' : 'block' : 'none'}
            pl={1} h='20%' w='30px' zIndex='docked' position='absolute'
            userSelect='none' left={0} icon={ArrowButtonLeft2}
            fill='dimmers.300'
          />
          <Icon
            display={gallerySwiper ? (gallerySwiper.activeIndex + 1) === files.length ? 'none' : 'block' : 'none'}
            onClick={() => { gallerySwiper.slideNext() }} pr={1} h='20%' w='30px' zIndex='docked' position='absolute'
            userSelect='none' right={0} icon={ArrowButtonRight2}
            fill='dimmers.300'
          />
        </Flex>}
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
            ? <Spinner size='xl' color='red.500' />
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
