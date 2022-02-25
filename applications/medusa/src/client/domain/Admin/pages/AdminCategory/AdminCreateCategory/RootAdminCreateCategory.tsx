import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import AdminCreateCategoryQuery, {
  AdminCreateCategoryQuery as AdminCreateCategoryQueryType
} from '@//:artifacts/AdminCreateCategoryQuery.graphql'
import AdminCreateCategory from './AdminCreateCategory/AdminCreateCategory'
import { Trans } from '@lingui/macro'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminCreateCategoryQueryType>
  }
}

export default function RootAdminCreateCategory (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    AdminCreateCategoryQuery,
    props.prepared.query
  )

  return (
    <>
      <Helmet title='create category' />
      <PageWrapper>
        <PageSectionTitle>
          <Trans>
            Create Category
          </Trans>
        </PageSectionTitle>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <AdminCreateCategory
              query={queryRef as PreloadedQuery<AdminCreateCategoryQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
