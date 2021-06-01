/**
 * @flow
 */
import type { Node } from 'react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import RootElement from '@//:modules/utilities/RootElement'

import {
  Box,
  Flex,
  Image,
  Spinner

} from '@chakra-ui/react'

import SwiperCore, { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import InspectModal from '@//:modules/content/posts/full/components/modal/InspectModal'
import ExpandButton from '@//:modules/content/posts/full/components/buttons/ExpandButton'

SwiperCore.use([Pagination, Navigation])

type Props = {
  files: {
    id: string,
  },
  urls: {
    key: string,
  },
  setSwiper: any,
}

export default function Gallery ({ files, urls, setSwiper }: Props): Node {
  const [isOpen, setOpen] = useState(false)

  const [currentSlide, setSlide] = useState(null)

  const [previewExpand, setPreviewExpand] = useState(false)

  return (
    <>
      <Swiper
        pagination={{
          clickable: true
        }}
        centeredSlides
        navigation
        onSlideChange={(swiper) => setSwiper(swiper)}

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
                {content
                  ? (
                    <Flex
                      h='100%'
                      position='relative'
                      align='center'
                      justify='center'
                      userSelect='none'
                    >
                      <Image
                        alt='thumbnail'
                        w='100%'
                        h='100%'
                        objectFit='cover'
                        src={content}
                      />
                      <Box
                        bg='transparent'
                        w='40%'
                        h='50%'
                        position='absolute'
                        onClick={() => {
                          setSlide(file.id)
                          setOpen(true)
                        }}
                      />
                    </Flex>
                    )
                  : (
                    <Spinner size='xl' color='red.500' />
                    )}
              </Flex>
            </SwiperSlide>
          )
        })}
      </Swiper>
      {createPortal(
        <InspectModal
          isOpen={isOpen} onClose={() => {
            setOpen(false)
          }}
          supplement={<ExpandButton onClick={() => { setPreviewExpand(!previewExpand) }} isExpanded={previewExpand} />}
        >

          {currentSlide
            ? (
              <Image
                alt='thumbnail'
                h={!previewExpand ? '100%' : 'auto'}
                w={!previewExpand ? 'auto' : '100%'}
                objectFit={!previewExpand ? 'contain' : 'cover'}
                src={urls[currentSlide]}
              />
              )
            : (
              <Spinner size='xl' color='red.500' />
              )}
        </InspectModal>,
        RootElement
      )}
    </>
  )
}
