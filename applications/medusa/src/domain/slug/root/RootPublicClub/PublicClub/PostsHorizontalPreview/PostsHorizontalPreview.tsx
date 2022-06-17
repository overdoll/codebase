import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { PostPreviewContent } from '@//:modules/content/Posts'
import type { PostsHorizontalPreviewFragment$key } from '@//:artifacts/PostsHorizontalPreviewFragment.graphql'
import { Trans } from '@lingui/macro'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { UrlObject } from 'url'
import { EmptyPosts } from '@//:modules/content/Placeholder'

interface Props {
  query: PostsHorizontalPreviewFragment$key | null
  href: string | UrlObject
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
  href,
  hasNext
}: Props): JSX.Element {
  const data = useFragment(PostFragment, query)

  if (((data?.edges) != null) && data?.edges.length < 1) {
    return (
      <EmptyPosts />
    )
  }

  return (
    <Box>
      <Swiper
        spaceBetween={16}
        centeredSlides={data?.edges != null && data?.edges.length < 2}
        slidesPerView={2.5}
      >
        {data?.edges.map((item, index) =>
          <SwiperSlide
            key={index}
          >
            <Flex h={270} w={200}>
              <LinkTile href={{
                pathname: '/[slug]/post/[reference]',
                query: {
                  slug: item.node.club.slug,
                  reference: item.node.reference
                }
              }}
              >
                <PostPreviewContent query={item.node} />
              </LinkTile>
            </Flex>
          </SwiperSlide>)}
        {hasNext && (
          <SwiperSlide>
            <LinkTile href={href}>
              <Flex h={270} w={200} bg='gray.800' align='center' justify='center'>
                <Heading fontSize='lg' color='gray.00'>
                  <Trans>
                    See all
                  </Trans>
                </Heading>
              </Flex>
            </LinkTile>
          </SwiperSlide>)}
      </Swiper>
    </Box>
  )
}
