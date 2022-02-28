import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { MyClubsQuery } from '@//:artifacts/MyClubsQuery.graphql'
import { graphql } from 'react-relay'
import { Trans } from '@lingui/macro'
import ClubPostsFeed from './ClubPostsFeed/ClubPostsFeed'
import PageSectionScroller from '../../../components/PageSectionScroller/PageSectionScroller'
import SearchSuggestedClubs from './SearchSuggestedClubs/SearchSuggestedClubs'
import { PageWrapper } from '@//:modules/content/PageLayout'

interface Props {
  query: PreloadedQuery<MyClubsQuery>
}

const Query = graphql`
  query MyClubsQuery($search: String) {
    ...SuggestedClubsFragment
    viewer {
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
      <PageWrapper>
        <SearchSuggestedClubs />
      </PageWrapper>
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
      <SearchSuggestedClubs />
    </PageSectionScroller>
  )
}
