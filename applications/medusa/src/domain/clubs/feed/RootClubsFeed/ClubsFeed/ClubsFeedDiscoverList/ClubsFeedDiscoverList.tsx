import { graphql, usePaginationFragment } from 'react-relay'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { ClubsFeedDiscoverListFragment$key } from '@//:artifacts/ClubsFeedDiscoverListFragment.graphql'
import type { ClubsFeedQuery } from '@//:artifacts/ClubsFeedQuery.graphql'
import ClubJoinTile from '../../../../../../common/components/ClubJoinTile/ClubJoinTile'
import { Trans } from '@lingui/macro'
import { Box, Flex, Heading, useBreakpointValue } from '@chakra-ui/react'
import {
  SEARCH_SLIDE_HEIGHT,
  SEARCH_SLIDE_WIDTH,
  SEARCH_SWIPER_PROPS
} from '@//:common/components/PageHeader/SearchButton/constants'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {
  query: ClubsFeedDiscoverListFragment$key
}

const Fragment = graphql`
  fragment ClubsFeedDiscoverListFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 9}
    after: {type: String}
  )
  @refetchable(queryName: "ClubsFeedDiscoverListPaginationQuery" ) {
    discoverClubs (first: $first, after: $after)
    @connection (key: "DiscoverClubs_discoverClubs") {
      edges {
        node {
          id
          ...ClubJoinTileFragment
        }
      }
    }
    viewer {
      ...ClubJoinTileViewerFragment
    }
  }
`

export default function ClubsFeedDiscoverList ({
  query
}: Props): JSX.Element {
  const {
    data,
    hasNext
  } = usePaginationFragment<ClubsFeedQuery, any>(
    Fragment,
    query
  )

  const slideHeight = useBreakpointValue(SEARCH_SLIDE_HEIGHT)
  const slideWidth = useBreakpointValue(SEARCH_SLIDE_WIDTH)

  if (data.discoverClubs.edges.length < 1) {
    return <></>
  }

  return (
    <Box overflowX='hidden'>
      <Swiper {...SEARCH_SWIPER_PROPS}>
        {data.discoverClubs.edges.map((item) => (
          <SwiperSlide
            style={{
              height: slideHeight,
              width: slideWidth
            }}
            key={item.node.id}
          >
            <ClubJoinTile clubQuery={item.node} viewerQuery={data.viewer} />
          </SwiperSlide>
        ))}
        {hasNext && (
          <SwiperSlide
            style={{
              height: slideHeight,
              width: slideWidth
            }}
          >
            <LinkTile href='/clubs/discover'>
              <Flex w='100%' h='100%' align='center' justify='center' borderRadius='inherit' bg='gray.800'>
                <Heading textAlign='center' color='gray.00' fontSize='sm'>
                  <Trans>
                    See All
                  </Trans>
                </Heading>
              </Flex>
            </LinkTile>
          </SwiperSlide>
        )}
      </Swiper>
    </Box>
  )
}
