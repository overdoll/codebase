import { Suspense } from 'react'
import { PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { StaffPostQuery as StaffPostQueryType } from '@//:artifacts/StaffPostQuery.graphql'
import StaffPostQuery from '@//:artifacts/StaffPostQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import Head from 'next/head'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import StaffPost from './StaffPost/StaffPost'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffPostQuery: PreloadedQuery<StaffPostQueryType>
  }
}

const RootStaffPost: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader<StaffPostQueryType>(
    StaffPostQuery,
    props.queryRefs.staffPostQuery
  )

  const { query: { reference } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Post - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='purple'>
            <Trans>
              Moderate Post
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: reference as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <StaffPost query={queryRef as PreloadedQuery<StaffPostQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootStaffPost
