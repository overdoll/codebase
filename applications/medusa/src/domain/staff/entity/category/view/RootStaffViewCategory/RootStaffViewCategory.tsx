import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { StaffViewCategoryQuery as StaffViewCategoryQueryType } from '@//:artifacts/StaffViewCategoryQuery.graphql'
import StaffViewCategoryQuery from '@//:artifacts/StaffViewCategoryQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Stack } from '@chakra-ui/react'
import StaffViewCategory from './StaffViewCategory/StaffViewCategory'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import { Trans } from '@lingui/macro'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffViewCategoryQuery: PreloadedQuery<StaffViewCategoryQueryType>
  }
}

const RootStaffViewCategory: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffViewCategoryQuery,
    props.queryRefs.staffViewCategoryQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <Head>
        <title>
          View Categories - Staff · overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton href='/staff/entity/category/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
            <Suspense fallback={<SkeletonStack />}>
              <StaffViewCategory query={queryRef as PreloadedQuery<StaffViewCategoryQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default RootStaffViewCategory
