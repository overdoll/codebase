import type { ProcessContentFragment$key } from '@//:artifacts/ProcessContentFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import RefreshProcessContent from './RefreshProcessContent/RefreshProcessContent'
import { Suspense, useEffect } from 'react'
import { Collapse } from '@chakra-ui/react'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface Props {
  query: ProcessContentFragment$key
}

interface SearchProps {
  reference: string
}

const Fragment = graphql`
  fragment ProcessContentFragment on Post {
    reference
    content {
      resource {
        processed
      }
    }
  }
`

export default function ProcessContent ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { state } = useSequenceContext()

  const {
    searchArguments,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      reference: data.reference
    }
  })

  useEffect(() => {
    if (state.isProcessing === false) return
    const refreshLoop = (): void => {
      loadQuery()
      setTimeout(refreshLoop, 5000)
    }

    setTimeout(refreshLoop, 5000)
  }, [state.isProcessing])

  return (
    <Collapse in={state.isProcessing === true}>
      <QueryErrorBoundary loadQuery={loadQuery}>
        <Suspense fallback={<></>}>
          <RefreshProcessContent searchArguments={searchArguments} />
        </Suspense>
      </QueryErrorBoundary>
    </Collapse>
  )
}
