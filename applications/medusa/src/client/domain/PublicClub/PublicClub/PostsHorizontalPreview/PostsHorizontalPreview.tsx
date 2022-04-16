import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { PostPreviewContent } from '@//:modules/content/Posts'
import type { PostsHorizontalPreviewFragment$key } from '@//:artifacts/PostsHorizontalPreviewFragment.graphql'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { GridTile, LinkTile } from '@//:modules/content/ContentSelection'

interface Props {
  query: PostsHorizontalPreviewFragment$key | null
  to: string
  hasNext: boolean
}

const PostFragment = graphql`
  fragment PostsHorizontalPreviewFragment on PostConnection {
    edges {
      node {
        reference
        ...PostPreviewContentFragment
        club {
          slug
        }
      }
    }
  }
`

export default function PostsHorizontalPreview ({
  query,
  to,
  hasNext
}: Props): JSX.Element {
  const data = useFragment(PostFragment, query)

  if (((data?.edges) != null) && data?.edges.length < 1) {
    return (
      <SmallBackgroundBox>
        <Trans>
          No posts found
        </Trans>
      </SmallBackgroundBox>
    )
  }

  return (
    <Box>
      <Swiper
        spaceBetween={16}
        centeredSlides={data?.edges != null && data?.edges.length < 3}
        slidesPerView={data?.edges != null && data?.edges.length < 3 ? 2 : 2.5}
      >
        {data?.edges.map((item, index) =>
          <SwiperSlide
            key={index}
          >
            <GridTile>
              <LinkTile to={`/${item.node.club.slug}/p/${item.node.reference}`}>
                <PostPreviewContent query={item.node} />
              </LinkTile>
            </GridTile>
          </SwiperSlide>)}
        {hasNext && (
          <SwiperSlide>
            <GridTile>
              <LinkTile to={to}>
                <Flex bg='gray.800' h='100%' w='100%' align='center' justify='center'>
                  <Heading fontSize='lg' color='gray.00'>
                    <Trans>
                      See all
                    </Trans>
                  </Heading>
                </Flex>
              </LinkTile>
            </GridTile>
          </SwiperSlide>)}
      </Swiper>
    </Box>
  )
}