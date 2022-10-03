import React, { Suspense } from 'react'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'
import SuspenseGeneric from '@//:modules/content/Placeholder/Loading/SuspenseGeneric/SuspenseGeneric'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { DisposeStaffClubsQuery, DisposeStaffClubsQuery$variables } from '@//:artifacts/DisposeStaffClubsQuery.graphql'
import { ContentContainer } from '@//:modules/content/PageLayout'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import ResultStaffClubs from './ResultStaffClubs/ResultStaffClubs'

interface Props extends ComponentSearchArguments<DisposeStaffClubsQuery$variables> {
  loadQuery: () => void
}

const Query = graphql`
  query DisposeStaffClubsQuery($name: String) {
    ...ResultStaffClubsFragment @arguments(name: $name)
  }
`

export default function DisposeStaffClubs (props: Props): JSX.Element {
  const {
    searchArguments,
    loadQuery
  } = props

  const queryData = useLazyLoadQuery<DisposeStaffClubsQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  return (
    <PageErrorBoundary loadQuery={loadQuery}>
      <Suspense fallback={<SuspenseGeneric />}>
        <ContentContainer>
          <ResultStaffClubs query={queryData} />
        </ContentContainer>
      </Suspense>
    </PageErrorBoundary>
  )
}
