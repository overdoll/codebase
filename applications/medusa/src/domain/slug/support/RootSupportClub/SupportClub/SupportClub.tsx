import { Suspense } from 'react'
import type { ResultPublicPostQuery as ResultPublicPostQueryType } from '@//:artifacts/ResultPublicPostQuery.graphql'
import { useRouter } from 'next/router'
import ResultSupportClub from './ResultSupportClub/ResultSupportClub'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import SkeletonPost from '../../../../../modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { MobileContainer } from '@//:modules/content/PageLayout'

interface Props {
  params: useQueryLoaderHookType<ResultPublicPostQueryType>
}

// we dispose of the query if the user leaves the page
// and if the query ref is somehow null, we manually load the query on mount
export default function SupportClub (props: Props): JSX.Element {
  const { params: [queryRef, loadQuery] } = props

  const { query: { slug } } = useRouter()

  const onLoadQuery = (): void => {
    loadQuery({ slug: slug as string })
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <Suspense fallback={(
        <MobileContainer>
          <SkeletonPost />
        </MobileContainer>
      )}
      >
        <ResultSupportClub query={queryRef} />
      </Suspense>
    </PageErrorBoundary>
  )
}
