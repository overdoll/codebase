import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { UsernameQuery as UsernameQueryType } from '@//:artifacts/UsernameQuery.graphql'
import UsernameQuery from '@//:artifacts/UsernameQuery.graphql'
import Username from './Username/Username'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Trans } from '@lingui/macro'
import { Helmet } from 'react-helmet-async'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  prepared: {
    query: PreloadedQuery<UsernameQueryType>
  }

}

export default function RootUsername (props: Props): JSX.Element | null {
  const [queryRef, loadQuery] = useQueryLoader(
    UsernameQuery,
    props.prepared.query
  )

  return (
    <>
      <Helmet title='username settings' />
      <PageWrapper>
        <BackButton to='/settings/profile'>
          <Trans>
            Back to profile settings
          </Trans>
        </BackButton>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='green'>
            <Trans>
              Username
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Modify your username
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <Username query={queryRef as PreloadedQuery<UsernameQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
