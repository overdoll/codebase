import { graphql } from 'react-relay'
import type { PreviewPostTileHomeFragment$key } from '@//:artifacts/PreviewPostTileHomeFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Box, Flex, Heading } from '@chakra-ui/react'
import PreviewPostContentSmallBanner from './PreviewPostContentSmallBanner/PreviewPostContentSmallBanner'
import PostLinkTile from '@//:modules/content/PageLayout/Display/fragments/Link/PostLinkTile/PostLinkTile'
import trackFathomEvent from '@//:modules/support/trackFathomEvent'
import { Icon } from '@//:modules/content/PageLayout'
import { FreshLeaf, HotContent } from '@//:assets/icons'

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
  badge?: 'trending' | 'new'
}

export default function PreviewPostTileHome (props: Props): JSX.Element {
  const {
    postQuery,
    badge
  } = props

  const data = useFragment(Fragment, postQuery)

  const onClick = (): void => {
    if (badge == null) return
    if (badge === 'new') {
      trackFathomEvent('0SR9MTDW', 1)
    } else {
      trackFathomEvent('ZZSA2HXV', 1)
    }
  }

  return (
    <PostLinkTile onClick={onClick} query={data}>
      <Flex borderRadius='lg' w='100%' h='100%' position='relative'>
        <PreviewPostContentSmallBanner postContentQuery={data.content[0]} />
        <Flex bottom={1} right={1} position='absolute'>
          {data.content.length > 1 && (
            <Flex w={8} h={8} justify='center' align='center' borderRadius='full' bg='dimmers.300' p={2}>
              <Heading fontSize='sm' color='whiteAlpha.900'>
                {data.content.length}
              </Heading>
            </Flex>
          )}
        </Flex>
        <Flex top={1} left={1} position='absolute'>
          {badge != null && (
            <Box borderRadius='full' p={2} bg='dimmers.300'>
              <Icon
                icon={badge === 'new' ? FreshLeaf : HotContent}
                fill={badge === 'new' ? 'green.500' : 'red.500'}
                w={4}
                h={4}
              />
            </Box>
          )}
        </Flex>
      </Flex>
    </PostLinkTile>
  )
}
