/**
 * @flow
 */
import type { Node } from 'react'
import { useState } from 'react'
import {
  Box,
  Flex,
  Avatar,
  Text,
  Skeleton
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Gallery from '@//:modules/content/posts/full/components/gallery/Gallery'
import PostMenu from '@//:modules/content/posts/full/components/menu/PostMenu'
import Indexer from '@//:modules/content/posts/full/components/indexer/Indexer'
import VoteMenu from '@//:modules/content/posts/full/components/vote/VoteMenu'
import ContextMenu from '@//:modules/content/posts/full/components/context/ContextMenu'
import TagInfo from '@//:modules/content/posts/full/components/info/TagInfo'

import TravelPlacesTheaterMask
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/travel-places-theater-mask-sjsQG5.svg'
import ShoppingStoreSignage1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/shopping-store-signage-1-WGy2xT.svg'
import Characters from '@//:modules/content/posts/full/components/info/sections/characters/Characters'
import Categories from '@//:modules/content/posts/full/components/info/sections/categories/Categories'

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

  const [t] = useTranslation('general')

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
            : (
              <Skeleton />
              )}
        </Flex>
        <Box w='100%' h='100%' mt={2} mb={2}>
          <Gallery setSwiper={setSwiper} files={files} urls={urls} />
        </Box>
        <Flex direction='column' w='100%'>
          <ContextMenu
            p={1} h={14}
            leftProps={<VoteMenu onClick={onVote} hasVoted={voted} voteCount={voteCount} disabled={disableContext} />}
            centerProp={<Indexer
              length={files.length}
              currentIndex={swiperIndex}
                        />} rightProps={<PostMenu disabled={disableContext} />}
          />

          <Flex mt={4} display={disableContext ? 'none' : 'flex'} direction='row' justify='space-evenly'>
            <TagInfo
              displayData={<Characters characters={characters} />} count={characters.length}
              icon={TravelPlacesTheaterMask}
            />
            <TagInfo
              displayData={<Categories categories={categories} />} count={categories.length}
              icon={ShoppingStoreSignage1}
            />
          </Flex>

        </Flex>
      </Flex>
    </>
  )
}
FullPost.defaultProps = {
  disableContext: false
}
