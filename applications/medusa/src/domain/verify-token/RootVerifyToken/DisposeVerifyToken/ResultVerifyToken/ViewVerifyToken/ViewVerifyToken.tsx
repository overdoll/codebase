import { useFragment, useMutation } from 'react-relay/hooks'
import type { ViewVerifyTokenFragment$key } from '@//:artifacts/ViewVerifyTokenFragment.graphql'
import type { ViewVerifyTokenMutation } from '@//:artifacts/ViewVerifyTokenMutation.graphql'
import { graphql } from 'react-relay'
import ConfirmVerifyToken from './ConfirmVerifyToken/ConfirmVerifyToken'
import PendingVerifyToken from './PendingVerifyToken/PendingVerifyToken'
import CompleteVerifyToken from './CompleteVerifyToken/CompleteVerifyToken'
import { useQueryParam } from 'use-query-params'
import { useState } from 'react'
import ErrorVerifyToken from './ErrorVerifyToken/ErrorVerifyToken'
import ValidationVerifyToken from './ValidationVerifyToken/ValidationVerifyToken'

interface Props {
  query: ViewVerifyTokenFragment$key
}

const Fragment = graphql`
  fragment ViewVerifyTokenFragment on AuthenticationToken {
    verified
    secure
    ...ConfirmVerifyTokenFragment
    ...PendingVerifyTokenFragment
    ...CompleteVerifyTokenFragment
  }
`

const Mutation = graphql`
  mutation ViewVerifyTokenMutation($input: VerifyAuthenticationTokenInput!) {
    verifyAuthenticationToken(input: $input) {
      validation
      authenticationToken {
        id
        verified
        accountStatus {
          registered
          multiFactor {
            totp
          }
        }
      }
    }
  }
`

export default function ViewVerifyToken (props: Props): JSX.Element {
  const {
    query
  } = props

  const data = useFragment(Fragment, query)

  const [verifyToken, isVerifyingToken] = useMutation<ViewVerifyTokenMutation>(
    Mutation
  )

  const [queryToken] = useQueryParam<string>('token')
  const [querySecret] = useQueryParam<string>('secret')

  const [hasError, setHasError] = useState(false)
  const [hasValidation, setHasValidation] = useState(false)

  const onVerifyToken = (): void => {
    verifyToken({
      variables: {
        input: {
          token: queryToken,
          secret: querySecret
        }
      },
      onCompleted (payload) {
        if (payload.verifyAuthenticationToken?.validation != null) {
          setHasValidation(true)
        }
      },
      onError () {
        setHasError(true)
      }
    })
  }

  if (hasError) {
    return <ErrorVerifyToken onRetry={() => setHasError(false)} />
  }

  if (hasValidation) {
    return <ValidationVerifyToken />
  }

  // not verified yet
  if (!data.verified) {
    // if not secure, show the page to confirm or deny the token
    if (!data.secure) {
      return <ConfirmVerifyToken onVerifyToken={onVerifyToken} isVerifyingToken={isVerifyingToken} query={data} />
    }

    // otherwise, we're in a "waiting" state - will auto-verify the token without requiring user action
    return <PendingVerifyToken onVerifyToken={onVerifyToken} query={data} />
  }

  // Token was verified and user was logged in
  return <CompleteVerifyToken query={data} />
}
