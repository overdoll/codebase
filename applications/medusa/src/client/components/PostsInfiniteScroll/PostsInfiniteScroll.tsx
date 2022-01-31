import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import './css/scrollbar.min.css'
import { Box, Flex, Heading, Spinner } from '@chakra-ui/react'
import SwiperCore, { Mousewheel, Scrollbar, Virtual } from 'swiper'
import { PostVideoManagerProvider } from '@//:modules/content/Posts'
import { ObserverManagerProvider } from '@//:modules/content/Posts/helpers/ObserverManager/ObserverManager'
import FullSimplePost from './FullSimplePost/FullSimplePost'
import type { PostsInfiniteScrollFragment$key } from '@//:artifacts/PostsInfiniteScrollFragment.graphql'
import type { PostsInfiniteScrollViewerFragment$key } from '@//:artifacts/PostsInfiniteScrollViewerFragment.graphql'
import { LargeBackgroundBox, PostPlaceholder, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { ReactNode, useState } from 'react'
import { Trans } from '@lingui/macro'
import PageSectionChildrenWrapper from '../PageSectionScroller/PageSectionChildrenWrapper/PageSectionChildrenWrapper'

interface Props {
  query: PostsInfiniteScrollFragment$key | null
  viewerQuery: PostsInfiniteScrollViewerFragment$key | null
  hasNext: boolean
  loadNext: (number, options) => {}
  isLoadingNext: boolean
  prependSlide?: ReactNode
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
  isLoadingNext,
  prependSlide
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
    const currentLength = data?.edges.length as number

    if (activeIndex + 3 >= currentLength && !isLoadingNext && hasNext) {
      loadNext(10, { onComplete: onCompleteLoaded })
    }
  }

  if (((data?.edges) != null) && data?.edges.length < 1) {
    return (
      <PageSectionChildrenWrapper>
        <SmallBackgroundBox>
          <Trans>
            No posts found
          </Trans>
        </SmallBackgroundBox>
      </PageSectionChildrenWrapper>

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
        slidesOffsetBefore={10}
        virtual={{
          cache: true,
          addSlidesBefore: 7,
          addSlidesAfter: 7
        }}
        spaceBetween={20}
        slidesPerView={1.1}
        freeMode
        direction='vertical'
      >
        {prependSlide != null && <SwiperSlide>
          {prependSlide}
        </SwiperSlide>}
        {data?.edges.map((item, index) =>
          <SwiperSlide
            key={index}
            virtualIndex={index}
          >
            <Box h='100%'>
              <ObserverManagerProvider>
                <PostVideoManagerProvider>
                  <FullSimplePost query={item.node} viewerQuery={viewerData} />
                </PostVideoManagerProvider>
              </ObserverManagerProvider>
            </Box>
          </SwiperSlide>)}
        {hasNext
          ? <SwiperSlide>
            {isLoadingNext &&
              <PostPlaceholder>
                <Spinner size='lg' />
              </PostPlaceholder>}
          </SwiperSlide>
          : <SwiperSlide>
            <LargeBackgroundBox h='72vh'>
              <Flex align='center' h='100%' justify='center'>
                <Heading fontSize='xl' color='gray.00'>
                  <Trans>
                    No more content available
                  </Trans>
                </Heading>
              </Flex>
            </LargeBackgroundBox>
          </SwiperSlide>}
      </Swiper>
    </Box>
  )
}
