import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { StaffViewCategoryQuery as StaffViewCategoryQueryType } from '@//:artifacts/StaffViewCategoryQuery.graphql'
import StaffViewCategoryQuery from '@//:artifacts/ClubPostsQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { Stack } from '@chakra-ui/react'
import StaffViewCategory from './StaffViewCategory/StaffViewCategory'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import { Trans } from '@lingui/macro'
import Head from 'next/head'

interface Props {
  prepared: {
    query: PreloadedQuery<StaffViewCategoryQueryType>
  }
}

export default function RootStaffViewCategory (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffViewCategoryQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Head>
        <title>
          View Categories - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton href='/staff/category/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
            <Suspense fallback={<SkeletonStack />}>
              <StaffViewCategory query={queryRef as PreloadedQuery<StaffViewCategoryQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
