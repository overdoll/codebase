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
  Skeleton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import Icon from '@//:modules/content/icon/Icon';
import { createPortal } from 'react-dom';
import RootElement from '@//:modules/utilities/RootElement';
import { useTranslation } from 'react-i18next';

import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import NavigationMenuHorizontal2 from '@streamlinehq/streamlinehq/img/streamline-bold/navigation-menu-horizontal-2-J4viN0.svg';
import RatingStar from '@streamlinehq/streamlinehq/img/streamline-bold/rating-star-gWaXzP.svg';

SwiperCore.use([Pagination, Navigation]);

type Props = {
  data: any,
};

export default function FullPost({ data }: Props): Node {
  const [isOpen, setOpen] = useState(false);

  const [currentSlide, setSlide] = useState(null);

  const [t] = useTranslation('general');

  return (
    <>
      <Flex
        direction="column"
        w="100%"
        maxWidth="lg"
        h="100%"
        align="center"
        display="absolute"
      >
        <Flex direction="row" align="center" w="100%">
          {data.artist ? (
            <>
              <Avatar
                name={data.artist.username}
                src={data.artist.avatar}
                size="sm"
                mr={2}
              />
              <Text>{data.artist.username}</Text>
            </>
          ) : (
            <Skeleton />
          )}
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
                  <Flex
                    h="600px"
                    position="relative"
                    align="center"
                    justify="center"
                    bg="gray.800"
                  >
                    {content ? (
                      <Flex
                        h="100%"
                        position="relative"
                        align="center"
                        justify="center"
                      >
                        <Image
                          alt="thumbnail"
                          w="100%"
                          h="100%"
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
                  </Flex>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
        <Flex direction="column" w="100%">
          <Flex direction="row" justify="space-between" align="center">
            <IconButton
              variant="ghost"
              icon={<Icon icon={RatingStar} w={7} h={7} fill="gray.500" />}
            />

            <Menu>
              <MenuButton
                as={IconButton}
                icon={
                  <Icon
                    icon={NavigationMenuHorizontal2}
                    w={7}
                    h={7}
                    fill="gray.500"
                  />
                }
                variant="ghost"
              />
            </Menu>
          </Flex>
          <Flex direction="row">
            <Text color="gray.300" mr={2}>
              {t('content.characters')}
            </Text>
            {data.characters ? (
              Object.keys(data.characters).map(character => (
                <Text
                  color="gray.200"
                  mr={1}
                  key={data.characters[character].id}
                >
                  {data.characters[character].name} (
                  {data.characters[character].media.title})
                </Text>
              ))
            ) : (
              <Skeleton />
            )}
          </Flex>
          <Flex direction="row">
            <Text color="gray.300" mr={2}>
              {t('content.categories')}
            </Text>

            {data.categories ? (
              Object.keys(data.categories).map(category => (
                <Text
                  color="gray.200"
                  mr={1}
                  key={data.categories[category].id}
                >
                  {data.categories[category].title}
                </Text>
              ))
            ) : (
              <Skeleton />
            )}
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
              w="100%"
              display="flex"
              p={0}
              align="center"
              justify="center"
            >
              <Flex w="100%" align="center" justify="center">
                {currentSlide ? (
                  <Image
                    alt="thumbnail"
                    h="100%"
                    objectFit="contain"
                    src={data.urls[currentSlide]}
                  />
                ) : (
                  <Spinner size="xl" color="red.500" />
                )}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>,
        RootElement,
      )}
    </>
  );
}
