import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { StaffViewAudienceQuery as StaffViewAudienceQueryType } from '@//:artifacts/StaffViewAudienceQuery.graphql'
import StaffViewAudienceQuery from '@//:artifacts/ClubPostsQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { Stack } from '@chakra-ui/react'
import StaffViewAudience from './StaffViewAudience/StaffViewAudience'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import Head from 'next/head'

interface Props {
  prepared: {
    query: PreloadedQuery<StaffViewAudienceQueryType>
  }
}

export default function RootStaffViewAudience (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffViewAudienceQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Head>
        <title>
          View Audience - Staff :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton href='/staff/audience/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
            <Suspense fallback={<SkeletonStack />}>
              <StaffViewAudience query={queryRef as PreloadedQuery<StaffViewAudienceQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
