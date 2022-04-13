import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import StaffCreateCategoryQuery, {
  StaffCreateCategoryQuery as StaffCreateCategoryQueryType
} from '@//:artifacts/StaffCreateCategoryQuery.graphql'
import StaffCreateCategory from './StaffCreateCategory/StaffCreateCategory'
import { Trans } from '@lingui/macro'
import Head from 'next/head'

interface Props {
  prepared: {
    query: PreloadedQuery<StaffCreateCategoryQueryType>
  }
}

export default function RootStaffCreateCategory (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffCreateCategoryQuery,
    props.prepared.query
  )

  return (
    <>
      <Head>
        <title>
          Create Category - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <PageSectionTitle>
          <Trans>
            Create Category
          </Trans>
        </PageSectionTitle>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffCreateCategory
              query={queryRef as PreloadedQuery<StaffCreateCategoryQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
