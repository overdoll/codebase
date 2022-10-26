import { PreviewCarouselFragment$key } from '@//:artifacts/PreviewCarouselFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import SwiperType from 'swiper'
import CarouselGrid from '../../../components/CarouselGrid/CarouselGrid'
import CarouselGridItem from '../../../components/CarouselGridItem/CarouselGridItem'
import ThumbnailCarouseItem from '../ThumbnailCarouselItem/ThumbnailCarouseItem'
import { PREVIEW_LIMIT } from '../../Content/PreviewContent/PreviewContent'
import { Center, GridItem, Heading } from '@chakra-ui/react'
import { LinkTile } from '../../../../../ContentSelection'

interface Props {
  postQuery: PreviewCarouselFragment$key
  swiper: SwiperType | null
}

const PostFragment = graphql`
  fragment PreviewCarouselFragment on Post {
    id
    reference
    club {
      slug
    }
    content {
      id
      media {
        ...ThumbnailCarouseItemFragment
      }
      isSupporterOnly
    }
  }
`

export default function PreviewCarousel (props: Props): JSX.Element {
  const {
    postQuery,
    swiper
  } = props

  const postData = useFragment(PostFragment, postQuery)

  const slicedData = postData.content.slice(0, PREVIEW_LIMIT)

  const hasMoreData = postData.content.length > PREVIEW_LIMIT

  return (
    <CarouselGrid galleryLength={hasMoreData ? slicedData.length + 1 : slicedData.length}>
      {slicedData.map((item, index) => (
        <CarouselGridItem
          key={item.id}
          swiper={swiper}
          index={index}
          isSupporter={item.isSupporterOnly}
        >
          <ThumbnailCarouseItem
            isSupporter={item.isSupporterOnly}
            mediaQuery={item.media}
          />
        </CarouselGridItem>
      ))}
      {hasMoreData && (
        <GridItem overflow='hidden' w='100%'>
          <LinkTile
            borderRadius='2px'
            href={{
              pathname: '/[slug]/post/[reference]',
              query: {
                slug: postData.club.slug,
                reference: postData.reference
              }
            }}
          >
            <Center bg='gray.700' w='100%' h='100%'>
              <Heading color='gray.100' fontSize='sm' textAlign='center'>
                +{postData.content.length - PREVIEW_LIMIT}
              </Heading>
            </Center>
          </LinkTile>
        </GridItem>
      )}
    </CarouselGrid>
  )
}
