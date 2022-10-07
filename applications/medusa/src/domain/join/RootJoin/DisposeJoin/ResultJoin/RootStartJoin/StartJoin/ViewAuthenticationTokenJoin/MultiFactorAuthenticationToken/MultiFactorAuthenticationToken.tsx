import { graphql, useFragment } from 'react-relay/hooks'
import type {
  MultiFactorAuthenticationTokenFragment$key
} from '@//:artifacts/MultiFactorAuthenticationTokenFragment.graphql'
import TotpAuthenticationToken from './TotpAuthenticationToken/TotpAuthenticationToken'
import RecoveryCodeAuthenticationToken from './RecoveryCodeAuthenticationToken/RecoveryCodeAuthenticationToken'
import { useState } from 'react'
import usePreventWindowUnload from '@//:modules/hooks/usePreventWindowUnload'

interface Props {
  query: MultiFactorAuthenticationTokenFragment$key
}

const MultiFactorFragmentGQL = graphql`
  fragment MultiFactorAuthenticationTokenFragment on AuthenticationToken {
    ...TotpAuthenticationTokenFragment
    ...RecoveryCodeAuthenticationTokenFragment
  }
`

export default function MultiFactorAuthenticationToken (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(MultiFactorFragmentGQL, query)

  const [useRecovery, setUseRecovery] = useState(false)

  usePreventWindowUnload(data != null)

  if (useRecovery) {
    return (
      <RecoveryCodeAuthenticationToken onUseTotp={() => setUseRecovery(false)} query={data} />
    )
  }

  return (
    <TotpAuthenticationToken onUseTotp={() => setUseRecovery(true)} query={data} />
  )
}
