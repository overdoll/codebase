import { ReactNode, Suspense } from 'react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import type { RootQuery as RootQueryType } from '@//:artifacts/RootQuery.graphql'
import RootQuery from '@//:artifacts/RootQuery.graphql'
import AccountAuthorizer from './AccountAuthorizer/AccountAuthorizer'
import PageContents from './PageContents/PageContents'
import NoScript from './NoScript/NoScript'
import ErrorBoundary from '@//:modules/operations/ErrorBoundary'
import UniversalNavigator from './UniversalNavigator/UniversalNavigator'
import Head from 'next/head'

interface Props {
  queryRefs: {
    rootQuery: PreloadedQuery<RootQueryType>
  }
  children: ReactNode
}

const RootQueryGQL = graphql`
  query RootQuery @preloadable {
    viewer {
      ...AccountAuthorizerFragment
      ...UniversalNavigatorFragment
    }
    language {
      locale
    }
  }
`

const Root = (props: Props): JSX.Element => {
  const data = usePreloadedQuery<RootQueryType>(
    RootQueryGQL,
    props.queryRefs.rootQuery
  )

  return (
    <>
      <Head>
        <title>overdoll :: Find Your Club</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <AccountAuthorizer queryRef={data.viewer}>
        <UniversalNavigator queryRef={data.viewer} />
        <PageContents>
          <ErrorBoundary>
            <Suspense fallback={null}>
              {props.children}
            </Suspense>
          </ErrorBoundary>
        </PageContents>
        <NoScript />
      </AccountAuthorizer>
    </>
  )
}

Root.getRelayPreloadProps = () => ({
  queries: {
    rootQuery: {
      params: RootQuery.params,
      variables: {}
    }
  }
})

const mapping = {
  en: 'en-US'
}

// dateFNS has weird mapping - so we check to make sure its proper here
function getDateFnsLocale (locale: string): string {
  if (mapping[locale] != null) {
    return mapping[locale]
  }

  return locale
}

Root.getTranslationProps = async (ctx) => {
  const translation = await import(
    `./__locale__/${ctx.locale as string}/index.js`
  )

  const dateFns = await import(
    /* webpackExclude: /_lib/ */`date-fns/locale/${getDateFnsLocale(ctx.locale as string)}/index.js`
  )

  return {
    ...translation.messages,
    dateFns
  }
}

export default Root
