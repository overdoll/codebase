import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import PublicPost from './PublicPost/PublicPost'
import type { PublicPostQuery as PublicPostQueryType } from '@//:artifacts/PublicPostQuery.graphql'
import PublicPostQuery from '@//:artifacts/PublicPostQuery.graphql'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { PageWrapper } from '@//:modules/content/PageLayout'
import Head from 'next/head'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'

interface Props {
  queryRefs: {
    publicPostQuery: PreloadedQuery<PublicPostQueryType>
  }
}

const RootPublicPost: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    PublicPostQuery,
    props.queryRefs.publicPostQuery
  )

  const { query: { reference } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Post :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: reference as string ?? '' })}>
          <Suspense fallback={(
            <SkeletonPost />
          )}
          >
            <PublicPost query={queryRef as PreloadedQuery<PublicPostQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootPublicPost
