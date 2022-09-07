import { graphql, useFragment } from 'react-relay'
import { Box, Heading, Stack } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperType from 'swiper'
import PostSlideIndex from '../../PostInteraction/PostSlideIndex/PostSlideIndex'
import { useState } from 'react'
import PostSupporterContent from '../PostSupporterContent/PostSupporterContent'
import PostMedia from '../../PostPlayback/PostMedia/PostMedia'
import PostSlideBackground from '../PostSlideBackground/PostSlideBackground'
import { POST_SWIPER_PROPS } from '../../../constants'
import { PostGalleryPublicSimpleFragment$key } from '@//:artifacts/PostGalleryPublicSimpleFragment.graphql'
import { PostGalleryPublicSimpleViewerFragment$key } from '@//:artifacts/PostGalleryPublicSimpleViewerFragment.graphql'
import { Trans } from '@lingui/macro'
import { Icon } from '../../../../PageLayout'
import { InfoCircle } from '@//:assets/icons'
import { LinkTile } from '../../../../ContentSelection'
import OverflowWrapper from './OverflowWrapper/OverflowWrapper'

interface Props {
  postQuery: PostGalleryPublicSimpleFragment$key
  viewerQuery: PostGalleryPublicSimpleViewerFragment$key | null
  hideOverflow?: boolean
}

const PostFragment = graphql`
  fragment PostGalleryPublicSimpleFragment on Post {
    reference
    content {
      id
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

  return (
    <Box userSelect='none'>
      <Swiper
        {...POST_SWIPER_PROPS}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {postData?.content.map((item, index) =>
          <SwiperSlide
            key={item.id}
            style={{
              height: 'auto',
              alignSelf: 'stretch'
            }}
          >
            <PostSlideBackground query={item}>
              <OverflowWrapper hideOverflow={hideOverflow}>
                <PostSupporterContent
                  query={item}
                  clubQuery={postData.club}
                  viewerQuery={viewerData}
                >
                  <Box position='relative'>
                    <PostMedia
                      query={item.resource}
                    />
                    <Box position='absolute' bottom={1} right={1}>
                      <LinkTile
                        width={16}
                        overflow={undefined}
                        href={{
                          pathname: '/[slug]/post/[reference]',
                          query: {
                            slug: postData.club.slug,
                            reference: postData.reference,
                            ...(index !== 0 && { slide: index })
                          }
                        }}
                      >
                        <Stack
                          align='center'
                          justify='center'
                          borderRadius='inherit'
                          bg='dimmers.700'
                          px={1}
                          py={2}
                          spacing={1}
                        >
                          <Icon icon={InfoCircle} w={3} h={3} fill='whiteAlpha.800' />
                          <Heading textAlign='center' fontSize='2xs' color='whiteAlpha.800'>
                            <Trans>
                              See Characters & Categories
                            </Trans>
                          </Heading>
                        </Stack>
                      </LinkTile>
                    </Box>
                  </Box>
                </PostSupporterContent>
              </OverflowWrapper>
            </PostSlideBackground>
          </SwiperSlide>
        )}
      </Swiper>
      <PostSlideIndex disableSlideIndexing swiper={swiper} query={postData} />
    </Box>
  )
}
