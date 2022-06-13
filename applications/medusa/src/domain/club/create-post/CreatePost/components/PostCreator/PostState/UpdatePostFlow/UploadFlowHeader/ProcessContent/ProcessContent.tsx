import type { ProcessContentFragment$key } from '@//:artifacts/ProcessContentFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import RefreshProcessContent from './RefreshProcessContent/RefreshProcessContent'
import { Suspense, useEffect, useRef } from 'react'
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

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const {
    searchArguments,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      reference: data.reference
    }
  })

  useEffect(() => {
    if (state.isProcessing === false) {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }

      return
    }

    const refreshLoop = (): void => {
      loadQuery()
      timeoutRef.current = setTimeout(refreshLoop, 5000)
    }

    timeoutRef.current = setTimeout(refreshLoop, 5000)
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
