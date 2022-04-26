import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { PayoutMethodSettingsQuery } from '@//:artifacts/PayoutMethodSettingsQuery.graphql'
import PayoutMethodSetupFlow from './PayoutMethodSetupFlow/PayoutMethodSetupFlow'
import PayoutCountryNotSupported from './PayoutCountryNotSupported/PayoutCountryNotSupported'
import PayoutMethodDelete from './PayoutMethodDelete/PayoutMethodDelete'

interface Props {
  query: PreloadedQuery<PayoutMethodSettingsQuery>
}

const Query = graphql`
  query PayoutMethodSettingsQuery @preloadable {
    viewer @required(action: THROW) {
      payoutMethod {
        __typename
        ...PayoutMethodDeleteFragment
      }
      details {
        country {
          payoutMethods
          ...PayoutMethodSetupFlowFragment
          ...PayoutCountryNotSupportedFragment
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
    return (
      <>setup account details first</>
    )
  }

  if (data.viewer.payoutMethod != null) {
    return (
      <PayoutMethodDelete query={data.viewer.payoutMethod} />
    )
  }

  if (data.viewer.details.country.payoutMethods.length < 1) {
    return (
      <PayoutCountryNotSupported query={data.viewer.details.country} />
    )
  }

  return (
    <PayoutMethodSetupFlow query={data.viewer.details.country} />
  )
}
