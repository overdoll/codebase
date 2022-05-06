import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { PayoutMethodSettingsQuery } from '@//:artifacts/PayoutMethodSettingsQuery.graphql'
import PayoutMethodSetupFlow from './PayoutMethodSetupFlow/PayoutMethodSetupFlow'
import PayoutCountryNotSupported from './PayoutCountryNotSupported/PayoutCountryNotSupported'
import PayoutMethodDelete from './PayoutMethodDelete/PayoutMethodDelete'
import { Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

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

  console.log('from method', data)

  if (data?.viewer?.details?.country == null) {
    return (
      <Stack spacing={2}>
        <Text textAlign='center' fontSize='md' color='gray.100'>
          <Trans>
            Please set up payout details before accessing this section
          </Trans>
        </Text>
      </Stack>
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
