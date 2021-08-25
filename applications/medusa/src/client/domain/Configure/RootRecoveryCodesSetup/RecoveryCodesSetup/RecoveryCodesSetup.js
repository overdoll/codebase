/**
 * @flow
 */

import type { RecoveryCodesSetupQuery } from '@//:artifacts/RecoveryCodesSetupQuery.graphql'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import RecoveryCodesList from './RecoveryCodesList/RecoveryCodesList'

type Props = {
  query: RecoveryCodesSetupQuery
}

const RecoveryCodesSetupQueryGQL = graphql`
  query RecoveryCodesSetupQuery {
    viewer {
      ...RecoveryCodesListFragment
      recoveryCodes {
        code
      }
    }
  }
`

export default function RecoveryCodesSetup (props: Props): Node {
  const queryData = usePreloadedQuery<RecoveryCodesSetupQuery>(
    RecoveryCodesSetupQueryGQL,
    props.query
  )

  return (
    <RecoveryCodesList data={queryData?.viewer} />
  )
}
