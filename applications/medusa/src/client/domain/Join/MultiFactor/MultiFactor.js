/**
 * @flow
 */
import { graphql, useFragment } from 'react-relay/hooks'
import type { MultiFactorFragment$key } from '@//:artifacts/MultiFactorFragment.graphql'
import TotpAuthentication from './TotpAuthentication/TotpAuthentication'

const MultiFactorFragmentGQL = graphql`
  fragment MultiFactorFragment on AuthenticationTokenAccountStatus {
    multiFactor {
      totp
    }
  }
`

type Props = {
  query: MultiFactorFragment$key,
}

export default function MultiFactor (props: Props): Node {
  const data = useFragment(MultiFactorFragmentGQL, props.query)

  if (data.multiFactor) {
    return <TotpAuthentication />
  }

  return (<></>)
}
