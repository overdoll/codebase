import { ReactNode } from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { RootQuery as RootQueryType } from '@//:artifacts/RootQuery.graphql'
import AccountAuthorizer from './AccountAuthorizer/AccountAuthorizer'
import PageContents from './PageContents/PageContents'
import UniversalNavigator from './UniversalNavigator/UniversalNavigator'
import { PageProps } from '@//:types/app'
import NoScript from './NoScript/NoScript'

interface Props {
  children: ReactNode
}

const Query = graphql`
  query RootQuery {
    viewer {
      ...AccountAuthorizerFragment
      ...UniversalNavigatorFragment
    }
  }
`

const Root: PageProps<Props> = (props: Props): JSX.Element => {
  const data = useLazyLoadQuery<RootQueryType>(
    Query,
    {}
  )

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
