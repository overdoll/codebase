import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { StaffViewAudienceQuery as StaffViewAudienceQueryType } from '@//:artifacts/StaffViewAudienceQuery.graphql'
import StaffViewAudienceQuery from '@//:artifacts/StaffViewAudienceQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Stack } from '@chakra-ui/react'
import StaffViewAudience from './StaffViewAudience/StaffViewAudience'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffViewAudienceQuery: PreloadedQuery<StaffViewAudienceQueryType>
  }
}

const RootStaffViewAudience: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffViewAudienceQuery,
    props.queryRefs.staffViewAudienceQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <Head>
        <title>
          View Audience - Staff · overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton href='/staff/entity/audience/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
            <Suspense fallback={<SkeletonStack />}>
              <StaffViewAudience query={queryRef as PreloadedQuery<StaffViewAudienceQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default RootStaffViewAudience
