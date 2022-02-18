import type { ProcessContentFragment$key } from '@//:artifacts/ProcessContentFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import RefreshProcessContent from './RefreshProcessContent/RefreshProcessContent'
import { Suspense, useContext, useEffect } from 'react'
import { Collapse } from '@chakra-ui/react'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { StateContext } from '@//:modules/hooks/useReducerBuilder/context'
import { useSearch } from '@//:modules/content/HookedComponents/Search'

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
      processed
    }
  }
`

export default function ProcessContent ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const state = useContext(StateContext)

  const {
    searchArguments,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      reference: data.reference
    }
  })

  useEffect(() => {
    if (state.isProcessing.value === false) return
    const refreshLoop = (): void => {
      loadQuery()
      setTimeout(refreshLoop, 5000)
    }

    setTimeout(refreshLoop, 5000)
  }, [state.isProcessing])

  return (
    <Collapse in={state.isProcessing.value === true}>
      <QueryErrorBoundary loadQuery={loadQuery}>
        <Suspense fallback={<></>}>
          <RefreshProcessContent searchArguments={searchArguments} />
        </Suspense>
      </QueryErrorBoundary>
    </Collapse>
  )
}
