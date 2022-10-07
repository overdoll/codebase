import { CinematicCarouselFragment$key } from '@//:artifacts/CinematicCarouselFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import SwiperType from 'swiper'
import CarouselGrid from '../../../components/CarouselGrid/CarouselGrid'
import CarouselGridItem from '../../../components/CarouselGridItem/CarouselGridItem'
import ThumbnailCarouseItem from '../ThumbnailCarouselItem/ThumbnailCarouseItem'

interface Props {
  postQuery: CinematicCarouselFragment$key
  swiper: SwiperType | null
}

const PostFragment = graphql`
  fragment CinematicCarouselFragment on Post {
    id
    content {
      id
      media {
        ...ThumbnailCarouseItemFragment
      }
      isSupporterOnly
    }
  }
`

export default function CinematicCarousel (props: Props): JSX.Element {
  const {
    postQuery,
    swiper
  } = props

  const postData = useFragment(PostFragment, postQuery)

  return (
    <CarouselGrid galleryLength={postData.content.length}>
      {postData.content.map((item, index) => (
        <CarouselGridItem
          key={item.id}
          swiper={swiper}
          index={index}
          isSupporter={item.isSupporterOnly}
        >
          <ThumbnailCarouseItem
            imageProps={{
              loadFirst: true
            }}
            mediaQuery={item.media}
            isSupporter={item.isSupporterOnly}
          />
        </CarouselGridItem>
      ))}
    </CarouselGrid>
  )
}
