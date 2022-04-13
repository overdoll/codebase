import CenteredSpinner from '@//:modules/content/Placeholder/Loading/CenteredSpinner/CenteredSpinner'
import { graphql, PreloadedQuery, useMutation, usePreloadedQuery } from 'react-relay/hooks'
import { useQueryParam } from 'use-query-params'
import { useEffect } from 'react'
import type { VerifyTokenQuery } from '@//:artifacts/VerifyTokenQuery.graphql'
import Confirm from './Confirm/Confirm'
import { VerifyTokenMutation } from '@//:artifacts/VerifyTokenMutation.graphql'
import translateValidation from '@//:modules/validation/translateValidation'
import { useLingui } from '@lingui/react'
import { useToast } from '@//:modules/content/ThemeComponents'
import Complete from './Complete/Complete'
import Invalid from './Invalid/Invalid'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    verifyTokenQuery: PreloadedQuery<VerifyTokenQuery>
  }
}

const Query = graphql`
  query VerifyTokenQuery($token: String!, $secret: String) {
    viewAuthenticationToken(token: $token, secret: $secret) {
      verified
      secure
      ...ConfirmFragment
      ...CompleteFragment
    }
  }
`

const Mutation = graphql`
  mutation VerifyTokenMutation($input: VerifyAuthenticationTokenInput!) {
    verifyAuthenticationToken(input: $input) {
      validation
      authenticationToken {
        id
        verified
      }
    }
  }
`

const VerifyToken: PageProps<Props> = (props: Props): JSX.Element => {
  const query = usePreloadedQuery<VerifyTokenQuery>(Query, props.queryRefs.verifyTokenQuery)

  const [verifyToken, isVerifyingToken] = useMutation<VerifyTokenMutation>(
    Mutation
  )

  const [queryToken] = useQueryParam<string>('token')
  const [querySecret] = useQueryParam<string>('secret')

  const data = query.viewAuthenticationToken

  const { i18n } = useLingui()

  const notify = useToast()

  const onVerify = (): void => {
    verifyToken({
      variables: {
        input: {
          token: queryToken,
          secret: querySecret
        }
      },
      onCompleted (payload) {
        if (payload.verifyAuthenticationToken?.validation != null) {
          notify({
            status: 'error',
            title: i18n._(translateValidation(payload.verifyAuthenticationToken.validation)),
            isClosable: true
          })
        }
      },
      onError () {
      }
    })
  }

  useEffect(() => {
    // secure and verified, auto-verify the token
    if ((data != null) && !data.verified && data.secure) {
      onVerify()
    }
  }, [data])

  // If the token is invalid, show the user this feedback
  if (data == null) {
    return (
      <Invalid />
    )
  }

  // not verified yet
  if (!data.verified) {
    // if not secure, show the page to confirm or deny the token
    if (!data.secure) {
      return (
        <Confirm
          query={data}
          verify={onVerify}
          isVerifying={isVerifyingToken}
        />
      )
    }

    // otherwise we're in a "waiting" state - will auto-verify the token without requiring user action
    return <CenteredSpinner />
  }

  // Token was verified and user was logged in
  return (
    <Complete query={data} />
  )
}

export default VerifyToken
