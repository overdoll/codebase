import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { MyClubsQuery } from '@//:artifacts/MyClubsQuery.graphql'
import { graphql } from 'react-relay'
import { Trans } from '@lingui/macro'
import SuggestedClubs from './SuggestedClubs/SuggestedClubs'
import ClubPostsFeed from './ClubPostsFeed/ClubPostsFeed'
import PageSectionScroller from '../../../components/PageSectionScroller/PageSectionScroller'
import PageSectionChildrenWrapper
  from '../../../components/PageSectionScroller/PageSectionChildrenWrapper/PageSectionChildrenWrapper'

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
      clubMembershipsCount
    }
  }
`

export default function MyClubs (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<MyClubsQuery>(
    Query,
    props.query
  )

  if (queryData.viewer == null || queryData?.viewer?.clubMembershipsCount < 1) {
    return (
      <PageSectionChildrenWrapper>
        <SuggestedClubs query={queryData} viewerQuery={queryData.viewer} />
      </PageSectionChildrenWrapper>
    )
  }

  return (
    <PageSectionScroller
      reversed={queryData?.viewer?.clubMembershipsCount > 0}
      childrenTitle={(
        <Trans>
          Popular Clubs
        </Trans>
      )}
      infiniteScrollTitle={<Trans>My Clubs</Trans>}
      pageInfiniteScroll={(
        <ClubPostsFeed
          query={queryData.viewer}
          viewerQuery={queryData.viewer}
        />
      )}
    >
      <SuggestedClubs query={queryData} viewerQuery={queryData.viewer} />
    </PageSectionScroller>
  )
}
