import { ReactNode } from 'react'
import { graphql, useLazyLoadQuery, useSubscribeToInvalidationState } from 'react-relay/hooks'
import type { RootQuery as RootQueryType } from '@//:artifacts/RootQuery.graphql'
import AccountAuthorizer from './AccountAuthorizer/AccountAuthorizer'
import PageContents from './PageContents/PageContents'
import UniversalNavigator from './UniversalNavigator/UniversalNavigator'
import { PageProps } from '@//:types/app'
import NoScript from './NoScript/NoScript'
import { useSearch } from '@//:modules/content/HookedComponents/Search'

interface Props {
  children: ReactNode
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
  const {
    searchArguments,
    loadQuery
  } = useSearch<{}>({
    defaultValue: {}
  })

  const data = useLazyLoadQuery<RootQueryType>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  useSubscribeToInvalidationState([data?.viewer?.id as string], () => {
    loadQuery()
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

export default Root
