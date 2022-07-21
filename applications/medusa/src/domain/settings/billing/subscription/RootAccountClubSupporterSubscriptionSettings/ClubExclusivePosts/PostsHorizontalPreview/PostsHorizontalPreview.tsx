import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react'
import { PostPreviewContent } from '@//:modules/content/Posts'
import type { PostsHorizontalPreviewFragment$key } from '@//:artifacts/PostsHorizontalPreviewFragment.graphql'
import { Trans } from '@lingui/macro'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { UrlObject } from 'url'
import { EmptyPosts } from '@//:modules/content/Placeholder'
import {
  SEARCH_SLIDE_HEIGHT,
  SEARCH_SLIDE_WIDTH,
  SEARCH_SWIPER_PROPS
} from '../../../../../../../common/components/PageHeader/SearchButton/constants'

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

  const slideHeight = useBreakpointValue(SEARCH_SLIDE_HEIGHT)
  const slideWidth = useBreakpointValue(SEARCH_SLIDE_WIDTH)

  if (((data?.edges) != null) && data?.edges.length < 1) {
    return (
      <EmptyPosts />
    )
  }

  return (
    <Box overflow='hidden'>
      <Swiper
        {...SEARCH_SWIPER_PROPS}
        centeredSlides={data?.edges != null && data?.edges.length < 2}
      >
        {data?.edges.map((item, index) =>
          <SwiperSlide
            style={{
              height: slideHeight,
              width: slideWidth
            }}
            key={index}
          >
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
          </SwiperSlide>)}
        {hasNext && (
          <SwiperSlide style={{
            height: slideHeight,
            width: slideWidth
          }}
          >
            <LinkTile href={href}>
              <Flex h='100%' w='100%' bg='gray.800' align='center' justify='center'>
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
