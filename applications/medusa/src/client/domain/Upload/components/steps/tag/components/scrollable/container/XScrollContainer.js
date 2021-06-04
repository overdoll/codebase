/**
 * @flow
 */
import type { Node } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Indexer from '../../../../../../../../components/FullPost/components/indexer/Indexer'
import Thumbnail from '../../../../arrange/components/thumbnail/Thumbnail'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import type { Thumbnails, Progress } from '@//:types/upload'
import type { UppyFile } from '@uppy/core'
import { useState } from 'react'

type Props = {
  thumbnails: Thumbnails,
  progress: Progress,
  files: Array<UppyFile>,
};

export default function XScrollContainer ({
  thumbnails,
  files,
  progress
}: Props): Node {
  const [swiperIndex, setSwiperIndex] = useState(0)

  return (
    <Box mt={2} mb={2}>
      <Swiper
        spaceBetween={10} slidesPerView={3}
        onSlideChange={(swiper) => setSwiperIndex(swiper.activeIndex)}
      >
        {files.map(file => {
          return (
            <SwiperSlide key={file.id}>
              <Flex h={170}>
                <Thumbnail thumbnail={thumbnails[file.id]} progress={progress} />
              </Flex>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Indexer
        mt={4} mb={2} length={files.length} slidesPerView={3}
        currentIndex={swiperIndex}
      />
    </Box>
  )
}
