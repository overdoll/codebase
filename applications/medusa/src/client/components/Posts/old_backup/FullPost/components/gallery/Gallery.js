/**
 * @flow
 */
import type { Node } from 'react';
import { useState, useRef } from 'react';
import {
  useDisclosure,
  Box,
  Flex, IconButton, Skeleton, Spinner,

} from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import InspectModal from '../../../components/modal/InspectModal';
import Icon from '@//:modules/content/Icon/Icon';

import SuspenseImage from '@//:modules/utilities/SuspenseImage';
import ImageSnippet from '@//:modules/content/DataDisplay/Snippets/ImageSnippet/ImageSnippet';

type File = {
  id: string,
}

type Props = {
  files: Array<File>,
  urls: {
    key: string,
  },
  thumbnails: {
    key: string,
  },
  setSwiper: () => void,
}

export default function Gallery({ files, urls, thumbnails, setSwiper }: Props): Node {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: previewExpand,
    onToggle: setPreviewExpand,
  } = useDisclosure();

  const [currentSlide, setSlide] = useState(null);

  const [gallerySwiper, setGallerySwiper] = useState(null);

  const [volume, setVolume] = useState(0.5);

  const swiper = useRef(null);

  const changeSwiper = (swiper) => {
    const videoElements = swiper.el.getElementsByTagName('video');

    setSwiper(swiper);
    setGallerySwiper(swiper);

    for (const video of videoElements) {
      video.volume = volume;
    }
  };

  return (
    <>
      {!swiper
        ? <Skeleton h='600px' />
        : <Box align='center' position='relative'>
          <Swiper
            ref={swiper}
            centeredSlides
            onSlideChange={(swiper) =>
              changeSwiper(swiper)}
            onSwiper={(swiper) => {
              changeSwiper(swiper);
            }}
          >
            {files.map((file, index) => {
              const content = urls[file.id];

              const fileType = file.type.split('/')[0];

              return (
                <SwiperSlide key={index}>
                  {({ isActive }) => {
                    const videoRef = useRef(null);

                    if (fileType === 'video') {
                      if (isActive && videoRef.current) {
                        videoRef.current.play();
                      } else if (!isActive && videoRef.current) {
                        videoRef.current.pause();
                      }
                    }

                    return (
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
                              ref={videoRef}
                              controls
                              disablePictureInPicture
                              controlsList='nodownload noremoteplayback'
                              onVolumeChange={(e) =>
                                setVolume(e.target.volume)}
                              muted loop preload='auto' style={{
                              objectFit: 'cover',
                              height: '100%',
                            }} poster={thumbnails[file.id]}
                            >
                              <source src={urls[file.id]} type={file.type} />
                            </video>
                            : <ImageSnippet src={content} />}
                          <Box
                            bg='transparent'
                            w='40%'
                            h='50%'
                            display={fileType === 'video' ? 'none' : 'block'}
                            position='absolute'
                            onClick={() => {
                              setSlide(file);
                              onOpen();
                            }}
                          />
                        </Flex>
                      </Flex>
                    );
                  }}

                </SwiperSlide>
              );
            })}
          </Swiper>
          <Icon
            onClick={() => {
              gallerySwiper.slidePrev();
            }}
            display={gallerySwiper?.activeIndex === 0 ? 'none' : 'flex'}
            pl={1} h='20%' w='30px' zIndex='docked' position='absolute'
            userSelect='none' left={0} icon={}
            cursor='pointer'
            fill='dimmers.300'
            top='40%'
          />
          <Icon
            display={(gallerySwiper?.activeIndex + 1) === files.length ? 'none' : 'flex'}
            onClick={() => {
              gallerySwiper.slideNext();
            }} pr={1} h='20%' w='30px' zIndex='docked'
            position='absolute'
            userSelect='none' right={0} icon={}
            cursor='pointer'
            fill='dimmers.300'
            top='40%'
          />
        </Box>}
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
              icon={}
              fill='gray.100'
              w={4}
              h={4}
            />
          }
        />}
      >
        {currentSlide
          ? currentSlide.type.split('/')[0] === 'video'
            ? <Spinner size='xl' color='primary.500' />
            : <SuspenseImage
              alt='thumbnail'
              h={!previewExpand ? '100%' : 'auto'}
              w={!previewExpand ? 'auto' : '100%'}
              objectFit={!previewExpand ? 'contain' : 'cover'}
              zIndex='hide'
              src={urls[currentSlide.id]} fallback={<Skeleton w='100%' h='100%' />}
            />
          : <Spinner size='xl' color='primary.500' />}
      </InspectModal>
    </>
  );
}
