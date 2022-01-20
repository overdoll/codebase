import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/scrollbar/scrollbar.min.css'
import { Box, Spinner } from '@chakra-ui/react'
import SwiperCore, { Mousewheel, Scrollbar } from 'swiper'
import { PostVideoManagerProvider } from '@//:modules/content/Posts'
import { ObserverManagerProvider } from '@//:modules/content/Posts/helpers/ObserverManager/ObserverManager'
import FullSimplePost from '../../domain/Home/Home/FullSimplePost/FullSimplePost'
import type { PostsInfiniteScrollFragment$key } from '@//:artifacts/PostsInfiniteScrollFragment.graphql'
import type { PostsInfiniteScrollViewerFragment$key } from '@//:artifacts/PostsInfiniteScrollViewerFragment.graphql'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import { useEffect, useState } from 'react'

interface Props {
  query: PostsInfiniteScrollFragment$key | null
  viewerQuery: PostsInfiniteScrollViewerFragment$key | null
  hasNext: boolean
  loadNext: (number) => {}
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

  SwiperCore.use([Scrollbar, Mousewheel])

  const [swiper, setSwiper] = useState<SwiperCore | null>(null)

  const onSlideChange = (swiper): void => {
    const activeIndex = swiper.activeIndex as number
    const currentLength = data?.edges.length as number

    if (activeIndex + 3 >= currentLength && !isLoadingNext && hasNext) {
      loadNext(10)
    }
  }

  useEffect(() => {
    if (swiper == null) return
    swiper.updateSlides()
  }, [swiper, data])

  return (
    <Box>
      <Swiper
        onSwiper={(swiper) => setSwiper(swiper)}
        onSlideChange={(swiper) => onSlideChange(swiper)}
        scrollbar={{ hide: true }}
        style={{ height: 'calc(100vh - 100px)' }}
        slidesPerView={1.15}
        mousewheel
        spaceBetween={20}
        freeMode
        direction='vertical'
      >
        {data?.edges.map((item, index) =>
          <SwiperSlide
            key={index}
          >
            <Box h='100%'>
              <ObserverManagerProvider>
                <PostVideoManagerProvider>
                  <FullSimplePost query={item.node} viewerQuery={viewerData} />
                </PostVideoManagerProvider>
              </ObserverManagerProvider>
            </Box>
          </SwiperSlide>)}
        {hasNext && <SwiperSlide>
          {isLoadingNext &&
            <PostPlaceholder>
              <Spinner size='lg' />
            </PostPlaceholder>}
        </SwiperSlide>}
      </Swiper>
    </Box>
  )
}
