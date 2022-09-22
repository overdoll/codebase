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
      <Flex borderRadius='lg' w='100%' h='100%' position='relative'>
        <PreviewPostContentSmallBanner postContentQuery={data.content[0]} />
        <Flex bottom={1} right={1} position='absolute'>
          {data.content.length > 1 && (
            <Box borderRadius='lg' bg='dimmers.500' p={1}>
              <Heading fontSize='xs' color='whiteAlpha.900'>
                {data.content.length}
              </Heading>
            </Box>
          )}
        </Flex>
      </Flex>
    </PostLinkTile>
  )
}
