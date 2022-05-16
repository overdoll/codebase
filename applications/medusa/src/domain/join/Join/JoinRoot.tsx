import { graphql, PreloadedQuery, usePreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { Suspense, useEffect, useState } from 'react'
import Register from './pages/Register/Register'
import Lobby from './pages/Lobby/Lobby'
import type { JoinRootQuery } from '@//:artifacts/JoinRootQuery.graphql'
import Join from './pages/Join/Join'
import Grant from './pages/Grant/Grant'
import MultiFactor from './pages/MultiFactor/MultiFactor'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { PageProps } from '@//:types/app'
import BackgroundPatternWrapper from './components/BackgroundPatternWrapper/BackgroundPatternWrapper'
import PageWrapperDesktop from '../../../common/components/PageWrapperDesktop/PageWrapperDesktop'
import PlatformBenefitsAdvert from './components/PlatformBenefitsAdvert/PlatformBenefitsAdvert'
import { useCookies } from 'react-cookie'
import { useUpdateEffect } from 'usehooks-ts'

interface Props {
  queryRefs: {
    joinQuery: PreloadedQuery<JoinRootQuery>
  }
}

const JoinTokenStatus = graphql`
  query JoinRootQuery($token: String!) @preloadable {
    viewAuthenticationToken(token: $token)  {
      id
      ...LobbyFragment
      ...JoinFragment
      ...RegisterFragment
      ...MultiFactorFragment
      ...GrantFragment
      verified
      token
      sameDevice
      accountStatus {
        registered
        multiFactor {
          __typename
        }
      }
    }
  }
`

// import translation and load the resource

const JoinRoot: PageProps<Props> = (props: Props): JSX.Element => {
  const [queryRef, loadQuery] = useQueryLoader<JoinRootQuery>(
    JoinTokenStatus,
    props.queryRefs.joinQuery
  )

  const [cookies] = useCookies<string>(['token'])

  const ref = usePreloadedQuery<JoinRootQuery>(JoinTokenStatus, queryRef as PreloadedQuery<JoinRootQuery>)

  const data = ref.viewAuthenticationToken

  const multiFactorEnabled = data?.accountStatus?.multiFactor !== null

  const authenticationInitiated = !(data == null)
  const authenticationTokenVerified = data?.verified === true

  // Keep track of the cookie here
  let tokenCookie = cookies.token

  if (tokenCookie != null) {
    tokenCookie = tokenCookie.split(';')[0]
  }

  // used to track whether there was previously a token grant, so that if
  // an invalid token was returned, we can show an "expired" token page
  const [hadGrant, setHadGrant] = useState<boolean>(false)

  // when a new join is started, we want to make sure that we save the fact that
  // there was one, so we can tell the user if the login code expired
  useEffect(() => {
    if (data != null) {
      setHadGrant(true)
    }
  }, [data])

  const clearGrant = (): void => {
    setHadGrant(false)
  }

  useUpdateEffect(() => {
    if (tokenCookie != null) {
      loadQuery({ token: tokenCookie })
    }
  }, [tokenCookie])

  const JoinFragment = (): JSX.Element => {
    // when authentication not initiated
    if (!authenticationInitiated) {
      return (
        <Join
          hadGrant={hadGrant}
          clearGrant={clearGrant}
          queryRef={data}
        />
      )
    }

    if (!authenticationTokenVerified) {
      return (
        <QueryErrorBoundary
          loadQuery={() => loadQuery({ token: tokenCookie }, { fetchPolicy: 'network-only' })}
        >
          <Suspense fallback={SkeletonStack}>
            <Lobby
              queryRef={data}
            />
          </Suspense>
        </QueryErrorBoundary>
      )
    }

    if (data?.accountStatus?.registered === false) {
      return <Register queryRef={data} />
    }

    // Check if the user has multi-factor enabled and show them the flow if they do
    if (multiFactorEnabled) {
      return <MultiFactor queryRef={data} />
    }

    // This one logs you in with the token - will error out if you try to log in if multiFactor isn't an empty array
    return (<Grant queryRef={data} />)
  }

  return (
    <BackgroundPatternWrapper>
      <PageWrapperDesktop>
        <PlatformBenefitsAdvert>
          <JoinFragment />
        </PlatformBenefitsAdvert>
      </PageWrapperDesktop>
    </BackgroundPatternWrapper>
  )
}

export default JoinRoot
