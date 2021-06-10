/**
 * @flow
 */
import type { Node } from 'react'
import { useState } from 'react'
import {
  useDisclosure,
  Box,
  Flex, IconButton,
  Spinner, Skeleton

} from '@chakra-ui/react'

import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import InspectModal from '../modal/InspectModal'
import Icon from '@//:modules/content/icon/Icon'

import InterfaceArrowsVerticalExpand1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-arrows-vertical-expand-1-7yVV8A.svg'
import InterfaceArrowsShrinkVertical
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-arrows-shrink-vertical-PvJl2S.svg'
import SuspenseImage from '@//:modules/utilities/SuspenseImage'

SwiperCore.use([Navigation])

type Props = {
  files: {
    id: string,
  },
  urls: {
    key: string,
  },
  setSwiper: () => void,
}

export default function Gallery ({ files, urls, setSwiper }: Props): Node {
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
        navigation={!(files.length <= 1)}
        onSlideChange={(swiper) => setSwiper(swiper)}
        allowTouchMove={!(files.length <= 1)}

      >
        {files.map((file) => {
          const content = urls[file.id]

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
                  <SuspenseImage
                    alt='thumbnail'
                    w='100%'
                    h='100%'
                    objectFit='cover'
                    src={content} fallback={<Skeleton w='100%' h='100%' />}
                  />
                  <Box
                    bg='transparent'
                    w='40%'
                    h='50%'
                    position='absolute'
                    onClick={() => {
                      setSlide(file.id)
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
          onClick={() => { previewExpand ? setPreviewExpand(false) : setPreviewExpand(true) }}
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

        <SuspenseImage
          alt='thumbnail'
          h={!previewExpand ? '100%' : 'auto'}
          w={!previewExpand ? 'auto' : '100%'}
          objectFit={!previewExpand ? 'contain' : 'cover'}
          src={urls[currentSlide]} fallback={<Skeleton w='100%' h='100%' />}
        />

      </InspectModal>
    </>
  )
}
