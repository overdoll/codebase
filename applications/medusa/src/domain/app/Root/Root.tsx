import { ReactNode } from 'react'
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
import { GetServerSidePropsResult } from 'next'

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

  useSubscribeToInvalidationState([data?.viewer?.id as string], () => {
    loadQuery({})
  })

  return (
    <AccountAuthorizer queryRef={data.viewer}>
      <UniversalNavigator queryRef={data.viewer} />
      <PageContents>
        {props.children}
      </PageContents>
      <NoScript />
    </AccountAuthorizer>
  )
}

export async function getServerSideProps ({
  res
}): Promise<GetServerSidePropsResult<any>> {
  res.setHeader(
    'Cache-Control',
    'public, max-age=31536000, immutable'
  )

  return {
    props: {}
  }
}

export default Root
