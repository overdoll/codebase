import { graphql, useFragment } from 'react-relay'
import { Box } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperType from 'swiper'
import PostSlideIndex from '../../PostInteraction/PostSlideIndex/PostSlideIndex'
import { useState } from 'react'
import PostSupporterContent from '../PostSupporterContent/PostSupporterContent'
import { Link } from '../../../../../routing'
import PostMedia from '../../PostPlayback/PostMedia/PostMedia'
import OverflowVisual from './OverflowVisual/OverflowVisual'
import PostSlideBackground from '../PostSlideBackground/PostSlideBackground'
import { POST_SWIPER_PROPS } from '../../../constants'
import { PostGalleryPublicSimpleFragment$key } from '@//:artifacts/PostGalleryPublicSimpleFragment.graphql'
import { PostGalleryPublicSimpleViewerFragment$key } from '@//:artifacts/PostGalleryPublicSimpleViewerFragment.graphql'

interface Props {
  postQuery: PostGalleryPublicSimpleFragment$key
  viewerQuery: PostGalleryPublicSimpleViewerFragment$key | null
}

const PostFragment = graphql`
  fragment PostGalleryPublicSimpleFragment on Post {
    reference
    content {
      resource {
        ...PostMediaFragment
      }
      ...PostSupporterContentFragment
      ...PostSlideBackgroundFragment
    }
    club {
      slug
      ...PostSupporterContentClubFragment
    }
    ...PostSlideIndexFragment
  }
`

const ViewerFragment = graphql`
  fragment PostGalleryPublicSimpleViewerFragment on Account {
    ...PostSupporterContentViewerFragment
  }
`

export default function PostGalleryPublicSimple ({
  postQuery,
  viewerQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const [swiper, setSwiper] = useState<null | SwiperType>(null)

  return (
    <Box>
      <Swiper
        {...POST_SWIPER_PROPS}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {postData?.content.map((item, index) =>
          <SwiperSlide
            key={index}
            style={{
              height: 'auto',
              alignSelf: 'stretch'
            }}
          >
            <PostSlideBackground query={item}>
              <OverflowVisual
                minH={100}
                maxH={700}
                align='center'
              >
                <PostSupporterContent
                  query={item}
                  clubQuery={postData.club}
                  viewerQuery={viewerData}
                >
                  <Link
                    href={{
                      pathname: '/[slug]/post/[reference]',
                      query: {
                        slug: postData.club.slug,
                        reference: postData.reference,
                        ...(index > 0 && { slide: index })
                      }
                    }}
                    passHref
                  >
                    <Box w='100%' h='100%' as='a'>
                      <PostMedia
                        controls={{ canControl: false }}
                        query={item.resource}
                      />
                    </Box>
                  </Link>
                </PostSupporterContent>
              </OverflowVisual>
            </PostSlideBackground>
          </SwiperSlide>
        )}
      </Swiper>
      {swiper != null && <PostSlideIndex swiper={swiper} query={postData} />}
    </Box>
  )
}
