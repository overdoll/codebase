/**
 * @flow
 */
import type { Node } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Thumbnail from '../../../../arrange/components/thumbnail/Thumbnail';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination]);

type Props = {
  thumbnails: any,
  progress: any,
  files: any,
};

export default function XScrollContainer({
  thumbnails,
  files,
  progress,
}: Props): Node {
  return (
    <Box mt={2} mb={2}>
      <Swiper spaceBetween={10} slidesPerView={3} pagination={true}>
        {files.map(file => {
          const thumbnail = thumbnails[file.id];
          const prog = progress[file.id];
          return (
            <SwiperSlide key={file.id}>
              <Flex h={170}>
                <Thumbnail thumbnail={thumbnail} progress={progress} />
              </Flex>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}
