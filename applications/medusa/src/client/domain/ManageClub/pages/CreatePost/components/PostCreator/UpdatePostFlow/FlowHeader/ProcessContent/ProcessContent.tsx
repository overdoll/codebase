import type { ProcessContentFragment$key } from '@//:artifacts/ProcessContentFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import RefreshProcessContent from './RefreshProcessContent/RefreshProcessContent'
import { Suspense, useContext, useEffect } from 'react'
import { Collapse } from '@chakra-ui/react'
import { useSearchQueryArguments } from '@//:modules/hooks'
import QueryErrorBoundary from '@//:modules/relay/QueryErrorBoundary/QueryErrorBoundary'
import { StateContext } from '../../../../../context'

interface Props {
  query: ProcessContentFragment$key
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

  const [queryArgs, setQueryArgs] = useSearchQueryArguments({ reference: data.reference })

  useEffect(() => {
    if (!state.isProcessing) return
    const refreshLoop = (): void => {
      setQueryArgs({ reference: data.reference })
      setTimeout(refreshLoop, 5000)
    }

    setTimeout(refreshLoop, 5000)
  }, [state.isProcessing])

  return (
    <Collapse in={state.isProcessing}>
      <QueryErrorBoundary loadQuery={() => setQueryArgs({ reference: data.reference })}>
        <Suspense fallback={<></>}>
          <RefreshProcessContent queryArgs={queryArgs} />
        </Suspense>
      </QueryErrorBoundary>
    </Collapse>
  )
}
