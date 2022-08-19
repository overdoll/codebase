import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { StaffViewTopicQuery as StaffViewTopicQueryType } from '@//:artifacts/StaffViewTopicQuery.graphql'
import StaffViewTopicQuery from '@//:artifacts/StaffViewTopicQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Stack } from '@chakra-ui/react'
import StaffViewTopic from './StaffViewTopic/StaffViewTopic'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    staffViewTopicQuery: PreloadedQuery<StaffViewTopicQueryType>
  }
}

const RootStaffViewTopic: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    StaffViewTopicQuery,
    props.queryRefs.staffViewTopicQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <Head>
        <title>
          View Topic - Staff · overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton href='/staff/entity/topic/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({
            slug: slug as string
          })}
          >
            <Suspense fallback={<SkeletonStack />}>
              <StaffViewTopic query={queryRef as PreloadedQuery<StaffViewTopicQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default RootStaffViewTopic
