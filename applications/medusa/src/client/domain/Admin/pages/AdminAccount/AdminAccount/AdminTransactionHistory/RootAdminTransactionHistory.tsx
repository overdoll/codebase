import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import {
  getDateRangeDefault
} from '@//:modules/content/HookedComponents/Search/components/SearchDateRange/SearchDateRange'
import { Stack } from '@chakra-ui/react'
import { useParams } from '@//:modules/routing'
import AdminTransactionHistory from './AdminTransactionHistory/AdminTransactionHistory'

interface SearchProps {
  startDate: Date
  username: string
}

export default function RootAdminTransactionHistory (): JSX.Element {
  const match = useParams()

  const {
    searchArguments,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      startDate: getDateRangeDefault().from,
      username: match.username as string
    }
  })

  return (
    <Stack spacing={2}>
      <QueryErrorBoundary loadQuery={loadQuery}>
        <Suspense fallback={<SkeletonStack />}>
          <AdminTransactionHistory searchArguments={searchArguments} />
        </Suspense>
      </QueryErrorBoundary>
    </Stack>
  )
}
