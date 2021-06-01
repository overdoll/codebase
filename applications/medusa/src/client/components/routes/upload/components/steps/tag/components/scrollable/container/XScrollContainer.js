/**
 * @flow
 */
import type { Node } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Thumbnail from '../../../../arrange/components/thumbnail/Thumbnail'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import SwiperCore, { Pagination } from 'swiper'
import type { Thumbnails, Progress } from '@//:types/upload'
import type { UppyFile } from '@uppy/core'

SwiperCore.use([Pagination])

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
  return (
    <Box mt={2} mb={2}>
      <Swiper spaceBetween={10} slidesPerView={3} pagination>
        {files.map(file => {
          const thumbnail = thumbnails[file.id]
          return (
            <SwiperSlide key={file.id}>
              <Flex h={170}>
                <Thumbnail thumbnail={thumbnail} progress={progress} />
              </Flex>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
  )
}
