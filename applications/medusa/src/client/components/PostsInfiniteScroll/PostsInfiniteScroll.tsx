import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import './css/scrollbar.min.css'
import { Box, Spinner } from '@chakra-ui/react'
import SwiperCore, { Mousewheel, Scrollbar, Virtual } from 'swiper'
import { PostVideoManagerProvider } from '@//:modules/content/Posts'
import { ObserverManagerProvider } from '@//:modules/content/Posts/support/ObserverManager/ObserverManager'
import FullSimplePost from './FullSimplePost/FullSimplePost'
import type { PostsInfiniteScrollFragment$key } from '@//:artifacts/PostsInfiniteScrollFragment.graphql'
import type { PostsInfiniteScrollViewerFragment$key } from '@//:artifacts/PostsInfiniteScrollViewerFragment.graphql'
import { PostPlaceholder, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { useState } from 'react'
import { Trans } from '@lingui/macro'

interface Props {
  query: PostsInfiniteScrollFragment$key
  viewerQuery: PostsInfiniteScrollViewerFragment$key | null
  hasNext: boolean
  loadNext: (number, options) => {}
  isLoadingNext: boolean
}

const PostFragment = graphql`
  fragment PostsInfiniteScrollFragment on PostConnection {
    edges {
      node {
        ...FullSimplePostFragment
      }
    }
  }
`

const ViewerFragment = graphql`
  fragment PostsInfiniteScrollViewerFragment on Account {
    ...FullSimplePostViewerFragment
  }
`

export default function PostsInfiniteScroll ({
  query,
  viewerQuery,
  hasNext,
  loadNext,
  isLoadingNext
}: Props): JSX.Element {
  const data = useFragment(PostFragment, query)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  SwiperCore.use([Scrollbar, Mousewheel, Virtual])

  const [swiper, setSwiper] = useState<SwiperCore | null>(null)

  const onCompleteLoaded = (): void => {
    if (swiper == null) return
    swiper.updateSlides()
  }

  const onSlideChange = (swiper): void => {
    const activeIndex = swiper.activeIndex as number
    const currentLength = data?.edges.length

    if (activeIndex + 3 >= currentLength && !isLoadingNext && hasNext) {
      loadNext(10, { onComplete: onCompleteLoaded })
    }
  }

  if (((data?.edges) != null) && data?.edges.length < 1) {
    return (
      <Box h='calc(100vh - 54px)'>
        <Box pb={14} />
        <SmallBackgroundBox>
          <Trans>
            No posts found
          </Trans>
        </SmallBackgroundBox>
      </Box>
    )
  }

  return (
    <Box>
      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={(swiper) => onSlideChange(swiper)}
        scrollbar={{ hide: true }}
        style={{ height: 'calc(100vh - 54px)' }}
        mousewheel
        slidesOffsetBefore={50}
        slidesOffsetAfter={40}
        virtual={{
          cache: true,
          addSlidesBefore: 12,
          addSlidesAfter: 12
        }}
        slidesPerView={1.1}
        freeModeSticky
        freeMode
        direction='vertical'
      >
        {data?.edges.map((item, index) =>
          <SwiperSlide
            key={index}
            virtualIndex={index}
          >
            <Box py={3} px={1} h='100%'>
              <ObserverManagerProvider>
                <PostVideoManagerProvider>
                  <FullSimplePost query={item.node} viewerQuery={viewerData} />
                </PostVideoManagerProvider>
              </ObserverManagerProvider>
            </Box>
          </SwiperSlide>)}
        {hasNext && (
          <SwiperSlide>
            {isLoadingNext &&
              <PostPlaceholder>
                <Spinner size='lg' />
              </PostPlaceholder>}
          </SwiperSlide>)}
      </Swiper>
    </Box>
  )
}
