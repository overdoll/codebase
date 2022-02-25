import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import AdminCreateAudienceQuery, {
  AdminCreateAudienceQuery as AdminCreateAudienceQueryType
} from '@//:artifacts/AdminCreateAudienceQuery.graphql'
import AdminCreateAudience from './AdminCreateAudience/AdminCreateAudience'
import { Trans } from '@lingui/macro'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminCreateAudienceQueryType>
  }
}

export default function RootAdminCreateAudience (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    AdminCreateAudienceQuery,
    props.prepared.query
  )

  return (
    <>
      <Helmet title='create audience' />
      <PageWrapper>
        <PageSectionTitle>
          <Trans>
            Create Audience
          </Trans>
        </PageSectionTitle>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <AdminCreateAudience
              query={queryRef as PreloadedQuery<AdminCreateAudienceQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
