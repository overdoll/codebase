/**
 * @flow
 */
import type { Node } from 'react';
import { useState } from 'react';
import {
  Image,
  Box,
  Flex,
  Center,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

type Props = {
  images: any,
};

export default function FullPost({ images }: Props): Node {
  SwiperCore.use([Pagination, Navigation]);

  const [isOpen, setOpen] = useState(false);

  const [currentSlide, setSlide] = useState(false);

  return (
    <Center>
      <Flex
        direction="column"
        w="100%"
        h="100%"
        align="center"
        display="absolute"
      >
        <Box w="100%" h="100%">
          <Swiper
            pagination={{
              clickable: true,
            }}
            centeredSlides={true}
            navigation={true}
            onSwiper={swiper => console.log(swiper)}
          >
            {images.files.map((file, index) => {
              const content = images.urls[file.id];

              return (
                <SwiperSlide key={file.id}>
                  {content ? (
                    <Flex>
                      <Image
                        alt="thumbnail"
                        w="100%"
                        h="600px"
                        objectFit="cover"
                        src={content}
                        onClick={o => {
                          setOpen(true);
                        }}
                      />
                      <Box bg="gray.500" w="50%" h="50%"></Box>
                    </Flex>
                  ) : (
                    <Spinner size="xl" color="red.500" />
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={o => {
          setOpen(false);
        }}
        size="full"
      >
        <ModalOverlay />
        <ModalContent m={0} borderRadius={0} bg="shadows.500">
          <ModalHeader />
          <ModalCloseButton size="lg" />
          <ModalBody h="100%" p={0}>
            <Flex align="center" justify="center">
              {currentSlide ? (
                <Image alt="thumbnail" w="100%" objectFit="cover" src={'url'} />
              ) : (
                <Spinner size="xl" color="red.500" />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
}
