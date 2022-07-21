import type {
  SupportClubTransactionProcessFragment$key
} from '@//:artifacts/SupportClubTransactionProcessFragment.graphql'
import type {
  SupportClubTransactionProcessViewerFragment$key
} from '@//:artifacts/SupportClubTransactionProcessViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { useQueryParam } from 'use-query-params'
import SupportSelectMethod from './SupportSelectMethod/SupportSelectMethod'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { ForwardedRef, Suspense } from 'react'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import CCBillDisplayTransaction from './CCBillDisplayTransaction/CCBillDisplayTransaction'
import { useUpdateEffect } from 'usehooks-ts'

interface Props {
  clubQuery: SupportClubTransactionProcessFragment$key
  viewerQuery: SupportClubTransactionProcessViewerFragment$key
  closeButtonRef: ForwardedRef<any>
}

interface SearchProps {
  token: string | null
}

const ClubFragment = graphql`
  fragment SupportClubTransactionProcessFragment on Club {
    ...SupportSelectMethodFragment
  }
`

const ViewerFragment = graphql`
  fragment SupportClubTransactionProcessViewerFragment on Account {
    ...SupportSelectMethodViewerFragment
  }
`

export default function SupportClubTransactionProcess ({
  clubQuery,
  viewerQuery,
  closeButtonRef
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const [tokenParam] = useQueryParam<string | null | undefined>('token')

  const {
    searchArguments,
    setArguments,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      token: (tokenParam != null ? tokenParam : null)
    }
  })

  useUpdateEffect(() => {
    if (tokenParam == null) {
      setArguments({ token: null })
      return
    }
    setArguments({ token: tokenParam })
  }, [tokenParam])

  if (searchArguments.variables.token != null) {
    return (
      <QueryErrorBoundary loadQuery={loadQuery}>
        <Suspense fallback={<SkeletonStack />}>
          <CCBillDisplayTransaction
            closeButtonRef={closeButtonRef}
            loadQuery={loadQuery}
            searchArguments={searchArguments}
          />
        </Suspense>
      </QueryErrorBoundary>
    )
  }

  return (
    <SupportSelectMethod closeButtonRef={closeButtonRef} clubQuery={clubData} viewerQuery={viewerData} />
  )
}
