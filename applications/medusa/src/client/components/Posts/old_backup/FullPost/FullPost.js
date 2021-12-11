/**
 * @flow
 */
import type { Node } from 'react';
import { useState } from 'react';
import { Avatar, Box, Flex, IconButton, Menu, MenuButton, Text, Wrap } from '@chakra-ui/react';
import Gallery from './components/gallery/Gallery';
import Indexer from './components/indexer/Indexer';
import VoteMenu from './components/vote/VoteMenu';
import TagInfo from './components/info/TagInfo';

type Props = {
  artist: {
    id: string,
    username: string,
    avatar: string,
  },
  files: Array<{
    id: string,
  }>,
  urls: Array<string>,
  thumbnails: Array<string>,
  characters: Array<{
    id: string,
    name: string,
    media: {
      id: string,
      title: string
    }
  }>,
  categories: Array<{
    id: string,
    title: string,
    thumbnail: string,
  }>,
  voteCount?: number,
  hasVoted?: boolean,
  disableContext?: boolean,
};

export default function FullPost({ artist, files, urls, characters, categories, voteCount, thumbnails, hasVoted, disableContext, ...rest }: Props): Node {
  const [voted, setVoted] = useState(hasVoted);

  const [swiperIndex, setSwiperIndex] = useState(0);

  const setSwiper = (swiper) => {
    setSwiperIndex(swiper.activeIndex);
  };

  const onVote = () => {
    // TODO handle voting on the backend here
    setVoted(!voted);
  };

  return (
    <>
      <Flex
        direction='column'
        w='100%'
        maxWidth='lg'
        h='100%'
        align='center'
        display='absolute'
        {...rest}
      >
        <Flex direction='row' align='center' w='100%'>
          <Avatar
            name={artist.username}
            src={artist.avatar}
            size='sm'
            mr={2}
          />
          <Text>{artist.username}</Text>

        </Flex>
        <Box w='100%' h='100%' mt={2} mb={2}>
          <Gallery setSwiper={setSwiper} files={files} urls={urls} thumbnails={thumbnails} />
        </Box>
        <Flex direction='column' w='100%' p={1}>
          <Flex direction='row' justify='space-between' align='center'>
            <Flex h='100%' direction='row'>
              <VoteMenu onClick={onVote} hasVoted={voted} voteCount={voteCount} disabled={disableContext} />
            </Flex>
            <Flex zIndex='hide' h='100%' left={0} right={0} margin='auto' w='100%' justify='center' position='absolute'>
              <Indexer
                length={files.length}
                currentIndex={swiperIndex}
              />
            </Flex>
            <Flex h='100%' direction='row'>
              <Menu>
                <MenuButton
                  as={IconButton}
                  borderRadius='full'
                  disabled={disableContext}
                  pt={2}
                  pb={2}
                  icon={
                    <Icon
                      p={2}
                      w='inherit'
                      h='inherit'
                      icon={}
                      fill='gray.500'
                    />
                  }
                  variant='ghost'
                />
              </Menu>
            </Flex>
          </Flex>
          <Flex
            mt={4} display={disableContext ? 'none' : 'flex'} direction='row'
            justify='space-evenly'
          >
            <TagInfo
              count={Object.keys(characters).length}
              icon={}
            >
              <Wrap justify='center'>
                {Object.keys(characters).map(item => (
                  <></>
                ))}
              </Wrap>
            </TagInfo>
            <TagInfo
              count={Object.keys(categories).length}
              icon={}
            >
              <Wrap justify='center'>
                {Object.keys(categories).map(item => (
                  <></>
                ))}
              </Wrap>
            </TagInfo>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
FullPost.defaultProps = {
  disableContext: false,
  hasVoted: false,
  voteCount: 0,
};