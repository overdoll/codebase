import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubPaymentsQuery } from '@//:artifacts/ClubPaymentsQuery.graphql'
import { EmptyBoundary, EmptyPayments, NotFoundClub } from '@//:modules/content/Placeholder'
import { Stack } from '@chakra-ui/react'
import { LoadMoreStackTile } from '@//:modules/content/ContentSelection'
import { usePaginationFragment } from 'react-relay'
import ClubPaymentCard from './ClubPaymentCard/ClubPaymentCard'

interface Props {
  query: PreloadedQuery<ClubPaymentsQuery>
}

const Query = graphql`
  query ClubPaymentsQuery($slug: String!)  {
    club(slug: $slug) {
      __typename
      viewerIsOwner
      ...ClubPaymentsFragment
    }
    viewer {
      isStaff
    }
  }
`

const Fragment = graphql`
  fragment ClubPaymentsFragment on Club
  @argumentDefinitions(
    first: {type: Int, defaultValue: 7}
    after: {type: String}
  )
  @refetchable(queryName: "ClubPaymentsPaginationQuery" ) {
    payments (first: $first, after: $after)
    @connection (key: "ClubPayments_payments") {
      edges {
        node {
          ...ClubPaymentCardFragment
        }
      }
    }
  }
`

export default function ClubPayments ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubPaymentsQuery>(
    Query,
    query
  )

  const {
    data,
    loadNext,
    hasNext,
    isLoadingNext
  } = usePaginationFragment<ClubPaymentsQuery, any>(
    Fragment, queryData.club
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  if (!queryData.club?.viewerIsOwner && ((queryData.viewer?.isStaff) === false)) {
    return <NotFoundClub />
  }

  return (
    <EmptyBoundary
      fallback={<EmptyPayments />}
      condition={data.payments.edges.length < 1}
    >
      <Stack spacing={2}>
        {data.payments.edges.map((item, index) => <ClubPaymentCard key={index} query={item.node} />)}
        <LoadMoreStackTile
          hasNext={hasNext}
          onLoadNext={() => loadNext(9)}
          isLoadingNext={isLoadingNext}
        />
      </Stack>
    </EmptyBoundary>
  )
}
