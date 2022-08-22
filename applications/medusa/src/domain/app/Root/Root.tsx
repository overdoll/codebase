import React, { ReactNode, useEffect, useMemo } from 'react'
import {
  graphql,
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
  useSubscribeToInvalidationState
} from 'react-relay/hooks'
import type { RootQuery as RootQueryType } from '@//:artifacts/RootQuery.graphql'
import AccountAuthorizer from './AccountAuthorizer/AccountAuthorizer'
import PageContents from './PageContents/PageContents'
import UniversalNavigator from './UniversalNavigator/UniversalNavigator'
import { PageProps } from '@//:types/app'
import NoScript from './NoScript/NoScript'
import SafeModal from './SafeModal/SafeModal'
import RootRichObject from '../../../common/rich-objects/default/RootRichObject/RootRichObject'
import { Random } from '@//:modules/utilities/random'
import hash from '@//:modules/utilities/hash'
import { useCookies } from 'react-cookie'

interface Props {
  children: ReactNode
  queryRefs: {
    rootQuery: PreloadedQuery<RootQueryType>
  }
}

const Query = graphql`
  query RootQuery {
    viewer {
      id
      ...AccountAuthorizerFragment
      ...UniversalNavigatorFragment
    }
  }
`

const Root: PageProps<Props> = (props: Props): JSX.Element => {
  const [queryRef, loadQuery] = useQueryLoader(
    Query,
    props.queryRefs.rootQuery
  )

  const data = usePreloadedQuery<RootQueryType>(Query, queryRef as PreloadedQuery<RootQueryType>)

  const time = `${Date.now()}`

  const [cookies, setCookie] = useCookies<string>(['postSeed'])

  const memoized = useMemo(() => new Random(hash(time)), [time])

  useSubscribeToInvalidationState([data?.viewer?.id as string], () => {
    loadQuery({}, { fetchPolicy: 'network-only' })
  })

  useEffect(() => {
    if (cookies.postSeed == null) {
      setCookie('postSeed', `${memoized.nextInt31()}`, {
        path: '/',
        secure: true,
        sameSite: 'lax'
      })
    }
  }, [])

  return (
    <>
      <AccountAuthorizer queryRef={data.viewer}>
        <UniversalNavigator queryRef={data.viewer} />
        <PageContents>
          {props.children}
          <SafeModal />
        </PageContents>
        <NoScript />
      </AccountAuthorizer>
      <RootRichObject />
    </>

  )
}

export default Root
