import { Suspense } from 'react'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import CCBillDisplayTransaction from '../../components/SupportClubButton/SupportSelectMethod/CCBillDisplayTransaction/CCBillDisplayTransaction'
import { useParams } from '@//:modules/routing'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'

interface SearchProps {
  token: string
}

export default function CCBillTransactionDetails (): JSX.Element {
  const match = useParams()
  const {
    searchArguments,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      token: match.token as string
    }
  })

  return (
    <>
      <Helmet title='ccbill transaction details' />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={loadQuery}>
          <Suspense fallback={<SkeletonStack />}>
            <CCBillDisplayTransaction onClose={() => {}} loadQuery={loadQuery} searchArguments={searchArguments} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
