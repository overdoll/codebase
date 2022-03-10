import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminCCBillSubscriptionDetailsQuery } from '@//:artifacts/AdminCCBillSubscriptionDetailsQuery.graphql'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'

interface Props {
  query: PreloadedQuery<AdminCCBillSubscriptionDetailsQuery>
}

const Query = graphql`
  query AdminCCBillSubscriptionDetailsQuery($ccbillSubscriptionId: String!) {
    ccbillSubscriptionDetails(ccbillSubscriptionId: $ccbillSubscriptionId) {
      id
    }
  }
`

export default function AdminCCBillSubscriptionDetails ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminCCBillSubscriptionDetailsQuery>(
    Query,
    query
  )

  if (queryData?.ccbillSubscriptionDetails == null) {
    return <NotFoundGeneric />
  }

  const subscription = queryData.ccbillSubscriptionDetails

  return (
    <>{subscription.id}</>
  )
}
