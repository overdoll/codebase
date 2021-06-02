/**
 * @flow
 */
import type { Node } from 'react'
import { useState } from 'react'
import { Avatar, Box, Flex, Skeleton, Text } from '@chakra-ui/react'
import Gallery from './components/gallery/Gallery'
import PostMenu from './components/menu/PostMenu'
import Indexer from './components/indexer/Indexer'
import VoteMenu from './components/vote/VoteMenu'
import TagInfo from './components/info/TagInfo'

import TravelPlacesTheaterMask
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/travel-places-theater-mask-sjsQG5.svg'
import ShoppingStoreSignage1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/shopping-store-signage-1-WGy2xT.svg'
import Characters from './components/info/sections/characters/Characters'
import Categories from './components/info/sections/categories/Categories'

type Props = {
  artist: {
    id: string,
    username: string,
    avatar: string,
  },
  files: {
    id: string,
  },
  urls: {
    key: string,
  },
  characters: {
    id: string,
    name: string,
    media: {
      id: string,
      title: string
    }
  },
  categories: {
    id: string,
    title: string,
  },
  voteCount: number,
  hasVoted: boolean,
  disableContext?: boolean,
};

export default function FullPost ({ artist, files, urls, characters, categories, voteCount, hasVoted, disableContext }: Props): Node {
  const [voted, setVoted] = useState(hasVoted)

  const [swiperIndex, setSwiperIndex] = useState(0)

  const setSwiper = (swiper) => {
    setSwiperIndex(swiper.activeIndex)
  }

  const onVote = () => {
    // TODO handle voting on the backend here
    setVoted(!voted)
  }

  return (
    <>
      <Flex
        direction='column'
        w='100%'
        maxWidth='lg'
        h='100%'
        align='center'
        display='absolute'
      >
        <Flex direction='row' align='center' w='100%'>
          {artist
            ? (
              <>
                <Avatar
                  name={artist.username}
                  src={artist.avatar}
                  size='sm'
                  mr={2}
                />
                <Text>{artist.username}</Text>
              </>
              )
            : <Skeleton />}
        </Flex>
        <Box w='100%' h='100%' mt={2} mb={2}>
          <Gallery setSwiper={setSwiper} files={files} urls={urls} />
        </Box>
        <Flex direction='column' w='100%' p={1} h={14}>
          <Flex direction='row' justify='space-between' position='relative' align='center'>
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
              <PostMenu disabled={disableContext} />
            </Flex>
          </Flex>
          <Flex mt={4} display={disableContext ? 'none' : 'flex'} direction='row' justify='space-evenly'>
            <TagInfo
              count={characters.length}
              icon={TravelPlacesTheaterMask}
            ><Characters characters={characters} />
            </TagInfo>
            <TagInfo
              count={categories.length}
              icon={ShoppingStoreSignage1}
            ><Categories categories={categories} />
            </TagInfo>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
FullPost.defaultProps = {
  disableContext: false
}
