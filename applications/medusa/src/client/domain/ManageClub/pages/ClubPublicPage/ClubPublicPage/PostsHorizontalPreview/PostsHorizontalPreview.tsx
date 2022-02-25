import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { PostPreviewContent } from '@//:modules/content/Posts'
import type { PostsHorizontalPreviewFragment$key } from '@//:artifacts/PostsHorizontalPreviewFragment.graphql'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { GridTile, GridWrap, LinkTile } from '@//:modules/content/ContentSelection'

interface Props {
  query: PostsHorizontalPreviewFragment$key | null
  to: string
}

const PostFragment = graphql`
  fragment PostsHorizontalPreviewFragment on PostConnection {
    edges {
      node {
        reference
        ...PostPreviewContentFragment
      }
    }
  }
`

export default function PostsHorizontalPreview ({
  query,
  to
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
        spaceBetween={6}
        slidesPerView={2.2}
      >
        {data?.edges.map((item, index) =>
          <SwiperSlide
            key={index}
            virtualIndex={index}
          >
            <GridWrap>
              <GridTile m={1}>
                <LinkTile to={`/p/${item.node.reference}`}>
                  <PostPreviewContent query={item.node} />
                </LinkTile>
              </GridTile>
            </GridWrap>
          </SwiperSlide>)}
        <SwiperSlide>
          <GridWrap>
            <GridTile m={1}>
              <LinkTile to={to}>
                <Flex w='100%' align='center' justify='center'>
                  <Heading fontSize='lg' color='gray.00'>
                    <Trans>
                      See All
                    </Trans>
                  </Heading>
                </Flex>
              </LinkTile>
            </GridTile>
          </GridWrap>
        </SwiperSlide>
      </Swiper>
    </Box>
  )
}
