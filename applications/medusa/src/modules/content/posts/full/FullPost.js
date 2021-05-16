/**
 * @flow
 */
import type { Node } from 'react';
import { useState } from 'react';
import {
  Image,
  Box,
  Flex,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { createPortal } from 'react-dom';
import RootElement from '@//:modules/utilities/RootElement';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

SwiperCore.use([Pagination, Navigation]);

type Props = {
  data: any,
};

export default function FullPost({ data }: Props): Node {
  const [isOpen, setOpen] = useState(false);

  const [currentSlide, setSlide] = useState(null);

  return (
    <>
      <Flex
        direction="column"
        w="100%"
        h="100%"
        align="center"
        display="absolute"
      >
        <Flex mt={2} direction="row" align="center" w="100%">
          <Avatar
            name={data.artist.username}
            src={data.artist.avatar}
            size="sm"
            mr={2}
          />
          <Text>{data.artist.username}</Text>
        </Flex>
        <Box w="100%" h="100%" mt={2} mb={2}>
          <Swiper
            pagination={{
              clickable: true,
            }}
            centeredSlides={true}
            navigation={true}
          >
            {data.files.map((file, index) => {
              const content = data.urls[file.id];

              return (
                <SwiperSlide key={file.id}>
                  {content ? (
                    <Flex position="relative" align="center" justify="center">
                      <Image
                        alt="thumbnail"
                        w="100%"
                        h="600px"
                        objectFit="cover"
                        src={content}
                      />
                      <Box
                        bg="transparent"
                        w="40%"
                        h="50%"
                        position="absolute"
                        onClick={o => {
                          setSlide(file.id);
                          setOpen(true);
                        }}
                      />
                    </Flex>
                  ) : (
                    <Spinner size="xl" color="red.500" />
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
        <Flex direction="column" w="100%">
          <Flex direction="row">
            <Text color="gray.300" mr={2}>
              Characters
            </Text>
            {Object.keys(data.characters).map(character => (
              <Text color="gray.200" mr={1} key={data.characters[character].id}>
                {data.characters[character].name} (
                {data.characters[character].media.title})
              </Text>
            ))}
          </Flex>
          <Flex direction="row">
            <Text color="gray.300" mr={2}>
              Categories
            </Text>
            {Object.keys(data.categories).map(category => (
              <Text color="gray.200" mr={1} key={data.categories[category].id}>
                {data.categories[category].title}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Flex>
      {createPortal(
        <Modal
          isOpen={isOpen}
          onClose={o => {
            setOpen(false);
          }}
          size="full"
        >
          <ModalOverlay />
          <ModalContent m={0} borderRadius={0} bg="shadows.500">
            <ModalCloseButton size="lg" />
            <ModalBody
              h="100%"
              display="flex"
              p={0}
              align="center"
              justify="center"
            >
              {currentSlide ? (
                <Image
                  alt="thumbnail"
                  w="100%"
                  objectFit="contain"
                  src={data.urls[currentSlide]}
                />
              ) : (
                <Flex w="100%" align="center" justify="center">
                  <Spinner size="xl" color="red.500" />
                </Flex>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>,
        RootElement,
      )}
    </>
  );
}
