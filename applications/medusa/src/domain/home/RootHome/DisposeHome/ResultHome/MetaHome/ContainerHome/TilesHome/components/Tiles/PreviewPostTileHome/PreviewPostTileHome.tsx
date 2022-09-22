import { graphql } from 'react-relay'
import type { PreviewPostTileHomeFragment$key } from '@//:artifacts/PreviewPostTileHomeFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Box, Flex, Heading } from '@chakra-ui/react'
import PreviewPostContentSmallBanner from './PreviewPostContentSmallBanner/PreviewPostContentSmallBanner'
import PostLinkTile from '@//:modules/content/PageLayout/Display/fragments/Link/PostLinkTile/PostLinkTile'

const Fragment = graphql`
  fragment PreviewPostTileHomeFragment on Post {
    content {
      ...PreviewPostContentSmallBannerFragment
    }
    ...PostLinkTileFragment
  }
`

interface Props {
  postQuery: PreviewPostTileHomeFragment$key
}

export default function PreviewPostTileHome (props: Props): JSX.Element {
  const {
    postQuery
  } = props

  const data = useFragment(Fragment, postQuery)

  return (
    <PostLinkTile query={data}>
      <Flex position='relative'>
        <PreviewPostContentSmallBanner postContentQuery={data.content[0]} />
        <Flex bottom={0} right={0} position='absolute'>
          {data.content.length > 1 && (
            <Box bg='dimmers.300' p={1}>
              <Heading fontSize='xs' color='whiteAlpha.800'>
                {data.content.length}
              </Heading>
            </Box>
          )}
        </Flex>
      </Flex>
    </PostLinkTile>
  )
}
