/**
 * @flow
 */

import { graphql, usePreloadedQuery, useMutation } from 'react-relay/hooks'
import type { MultiFactorTotpSetupQuery } from '@//:artifacts/MultiFactorTotpSetupQuery.graphql'
import MultiFactorTotpFlow from '../MultiFactorTotpFlow/MultiFactorTotpFlow'

type Props = {
  query: MultiFactorTotpSetupQuery
}

const MultiFactorTotpSetupQueryGQL = graphql`
  query MultiFactorTotpSetupQuery {
    viewer {
      multiFactorSettings {
        multiFactorTotpConfigured
      }
    }
  }
`

export default function MultiFactorTotpSetup (props: Props): Node {
  const queryData = usePreloadedQuery<MultiFactorTotpSetupQuery>(
    MultiFactorTotpSetupQueryGQL,
    props.query
  )

  return (
    <>
      {queryData?.viewer.multiFactorSettings.multiFactorEnabled && <>totp is already configured</>}
    </>
  )
}
