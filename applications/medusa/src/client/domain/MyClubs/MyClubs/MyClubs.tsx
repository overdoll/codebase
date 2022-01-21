import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { MyClubsQuery } from '@//:artifacts/MyClubsQuery.graphql'
import { graphql } from 'react-relay'
import { Box } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import SuggestedClubs from './SuggestedClubs/SuggestedClubs'
import ClubPostsFeed from './ClubPostsFeed/ClubPostsFeed'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {
  query: PreloadedQuery<MyClubsQuery>
}

const Query = graphql`
  query MyClubsQuery {
    ...SuggestedClubsFragment
    viewer {
      ...SuggestedClubsViewerFragment
      ...ClubPostsFeedFragment
      ...ClubPostsFeedViewerFragment
    }
  }
`

export default function MyClubs (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<MyClubsQuery>(
    Query,
    props.query
  )

  return (
    <Swiper
      style={{ height: 'calc(100vh - 100px)' }}
    >
      <SwiperSlide>
        <Box>
          <PageSectionWrap>
            <PageSectionTitle colorScheme='primary'>
              <Trans>Popular Clubs</Trans>
            </PageSectionTitle>
          </PageSectionWrap>
          <SuggestedClubs query={queryData} viewerQuery={queryData.viewer} />
        </Box>
      </SwiperSlide>
      <SwiperSlide>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='primary'>
            <Trans>My Clubs</Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <ClubPostsFeed query={queryData.viewer} viewerQuery={queryData.viewer} />
      </SwiperSlide>
    </Swiper>
  )
}
