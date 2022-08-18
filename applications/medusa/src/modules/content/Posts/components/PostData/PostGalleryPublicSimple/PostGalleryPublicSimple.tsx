import { graphql, useFragment } from 'react-relay'
import { Box } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperType from 'swiper'
import PostSlideIndex from '../../PostInteraction/PostSlideIndex/PostSlideIndex'
import { useState } from 'react'
import PostSupporterContent from '../PostSupporterContent/PostSupporterContent'
import { Link } from '../../../../../routing'
import PostMedia from '../../PostPlayback/PostMedia/PostMedia'
import PostSlideBackground from '../PostSlideBackground/PostSlideBackground'
import { POST_SWIPER_PROPS } from '../../../constants'
import { PostGalleryPublicSimpleFragment$key } from '@//:artifacts/PostGalleryPublicSimpleFragment.graphql'
import { PostGalleryPublicSimpleViewerFragment$key } from '@//:artifacts/PostGalleryPublicSimpleViewerFragment.graphql'
import PostHideOverflow from '../PostHideOverflow/PostHideOverflow'
import PostShowOverflow from '../PostShowOverflow/PostShowOverflow'

interface Props {
  postQuery: PostGalleryPublicSimpleFragment$key
  viewerQuery: PostGalleryPublicSimpleViewerFragment$key | null
  hideOverflow?: boolean
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
  viewerQuery,
  hideOverflow = true
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const [swiper, setSwiper] = useState<null | SwiperType>(null)

  const Wrapper = (children): JSX.Element => {
    if (hideOverflow) {
      return (
        <PostHideOverflow>
          {children}
        </PostHideOverflow>
      )
    }
    return (
      <PostShowOverflow>
        {children}
      </PostShowOverflow>
    )
  }

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
              {Wrapper(
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
              )}
            </PostSlideBackground>
          </SwiperSlide>
        )}
      </Swiper>
      <PostSlideIndex swiper={swiper} query={postData} />
    </Box>
  )
}
