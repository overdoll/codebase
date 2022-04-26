import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubRevenueQuery } from '@//:artifacts/ClubRevenueQuery.graphql'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import { Box, Stack } from '@chakra-ui/react'
import ClubFullBalance from './ClubFullBalance/ClubFullBalance'
import ClubPayoutsList from './ClubPayoutsList/ClubPayoutsList'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<ClubRevenueQuery>
}

const Query = graphql`
  query ClubRevenueQuery($slug: String!)  {
    club(slug: $slug) {
      __typename
      viewerIsOwner
      ...ClubFullBalanceFragment
      ...ClubPayoutsListFragment
    }
  }
`

export default function ClubRevenue ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubRevenueQuery>(
    Query,
    query
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  if (!queryData.club?.viewerIsOwner) {
    return <NotFoundClub />
  }

  return (
    <Stack spacing={8}>
      <ClubFullBalance query={queryData.club} />
      <ClubPayoutsList query={queryData.club} />
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Help
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <Stack spacing={2}>
          <></>
        </Stack>
      </Box>
    </Stack>
  )
}
