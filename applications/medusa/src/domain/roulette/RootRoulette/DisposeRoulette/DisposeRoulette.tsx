import React, { Suspense, useEffect } from 'react'
import type { ResultRouletteQuery as ResultRouletteQueryType } from '@//:artifacts/ResultRouletteQuery.graphql'
import { useQueryLoaderHookType } from 'react-relay/relay-hooks/useQueryLoader'
import { useUpdateEffect } from '@chakra-ui/react'
import { useQueryParam } from 'use-query-params'
import LoadRoulette from './LoadRoulette/LoadRoulette'
import { GameContainer } from '@//:modules/content/PageLayout'
import SuspenseRoulette from './SuspenseRoulette/SuspenseRoulette'
import ResultRoulette from './ResultRoulette/ResultRoulette'
import PageErrorBoundary from '@//:modules/content/Placeholder/Fallback/PageErrorBoundary/PageErrorBoundary'

interface Props {
  params: useQueryLoaderHookType<ResultRouletteQueryType>
}

export default function DisposeRoulette (props: Props): JSX.Element {
  const { params: [queryRef, loadQuery, disposeQuery] } = props

  const [gameSessionId] = useQueryParam<string | null | undefined>('gameSessionId')

  const onLoadQuery = (): void => {
    loadQuery({
      reference: gameSessionId ?? ''
    })
  }

  useEffect(() => {
    return () => {
      disposeQuery()
    }
  }, [])

  useUpdateEffect(() => {
    onLoadQuery()
  }, [gameSessionId])

  if (queryRef == null) {
    return <LoadRoulette loadQuery={onLoadQuery} />
  }

  return (
    <PageErrorBoundary loadQuery={onLoadQuery}>
      <GameContainer>
        <Suspense fallback={<SuspenseRoulette />}>
          <ResultRoulette query={queryRef} />
        </Suspense>
      </GameContainer>
    </PageErrorBoundary>
  )
}
