/**
 * @flow
 */
import { graphql, useFragment } from 'react-relay/hooks'
import type { MultiFactorFragment$key } from '@//:artifacts/MultiFactorFragment.graphql'
import TotpAuthentication from './TotpAuthentication/TotpAuthentication'

const MultiFactorFragmentGQL = graphql`
  fragment MultiFactorFragment on AuthenticationTokenAccountStatus {
    multiFactor
  }
`

type Props = {
  query: MultiFactorFragment$key,
}

export default function MultiFactor (props: Props): Node {
  const data = useFragment(MultiFactorFragmentGQL, props.query)

  if (data.multiFactor.includes('TOTP')) {
    return <TotpAuthentication />
  }

  return (<></>)
}
