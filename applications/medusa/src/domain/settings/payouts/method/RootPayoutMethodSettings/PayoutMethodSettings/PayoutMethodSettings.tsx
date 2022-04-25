import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { PayoutMethodSettingsQuery } from '@//:artifacts/PayoutMethodSettingsQuery.graphql'

interface Props {
  query: PreloadedQuery<PayoutMethodSettingsQuery>
}

const Query = graphql`
  query PayoutMethodSettingsQuery @preloadable {
    viewer @required(action: THROW) {
      payoutMethod {
        __typename
      }
      details {
        country {
          payoutMethods
        }
      }
    }
  }
`

export default function PayoutMethodSettings (props: Props): JSX.Element {
  const data = usePreloadedQuery<PayoutMethodSettingsQuery>(
    Query,
    props.query
  )

  if (data?.viewer?.details?.country == null) {
    return <>setup account details first</>
  }

  if (data.viewer.payoutMethod != null) {
    return <>show payout method and can delete</>
  }

  if (data.viewer.details.country.payoutMethods.length < 0) {
    return <>country not supported</>
  }

  return (
    <>setup payout method flow</>
  )
}
