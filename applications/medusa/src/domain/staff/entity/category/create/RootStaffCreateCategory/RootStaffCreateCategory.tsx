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
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffCreateCategoryQuery: PreloadedQuery<StaffCreateCategoryQueryType>
  }
}

const RootStaffCreateCategory: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffCreateCategoryQuery,
    props.queryRefs.staffCreateCategoryQuery
  )

  return (
    <>
      <Head>
        <title>
          Create Category - Staff · overdoll.com
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

export default RootStaffCreateCategory
