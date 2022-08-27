import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { RouletteQuery as RouletteQueryType } from '@//:artifacts/RouletteQuery.graphql'
import RouletteQuery from '@//:artifacts/RouletteQuery.graphql'
import { PageProps } from '@//:types/app'
import Roulette from './Roulette/Roulette'
import PageWrapperGame from './Roulette/PageWrapperGame/PageWrapperGame'
import { useQueryParam } from 'use-query-params'
import { Grid, GridItem, useUpdateEffect } from '@chakra-ui/react'
import { SequenceProvider, useSequence, ValueResolver } from '@//:modules/content/HookedComponents/Sequence'
import { SequenceResolver } from '@//:modules/content/HookedComponents/Sequence/types'
import RouletteScreenLoading from './Roulette/RouletteScreenLoading/RouletteScreenLoading'

interface Props {
  queryRefs: {
    rouletteQuery: PreloadedQuery<RouletteQueryType>
  }
}

interface SequenceProps {
  tutorialCompleted: boolean
  isSpinning: boolean
  isPending: boolean
}

const defaultValue: SequenceProps = {
  tutorialCompleted: false,
  isSpinning: false,
  isPending: false
}

const resolver: SequenceResolver<SequenceProps> = {
  tutorialCompleted: ValueResolver(),
  isSpinning: ValueResolver(),
  isPending: ValueResolver()
}

const RootRoulette: PageProps<Props> = (props: Props): JSX.Element => {
  const { queryRefs: { rouletteQuery } } = props

  const [gameSessionId] = useQueryParam<string | null | undefined>('gameSessionId')

  const [queryRef, loadQuery] = useQueryLoader(
    RouletteQuery,
    rouletteQuery)

  const methods = useSequence<SequenceProps>({
    defaultValue: defaultValue,
    resolver: resolver
  })

  const loadRoulette = (): void => {
    loadQuery({
      reference: gameSessionId ?? ''
    })
  }

  useUpdateEffect(() => {
    loadRoulette()
  }, [gameSessionId])

  return (
    <PageWrapperGame>
      <SequenceProvider {...methods}>
        <QueryErrorBoundary loadQuery={loadRoulette}>
          <Grid templateRows='24px 1fr 12vh' gap={1} templateColumns='100%' h='calc(100vh - 60px)' w='100%'>
            <Suspense fallback={(
              <>
                <GridItem />
                <RouletteScreenLoading />
              </>
            )}
            >
              <Roulette query={queryRef as PreloadedQuery<RouletteQueryType>} />
            </Suspense>
          </Grid>
        </QueryErrorBoundary>
      </SequenceProvider>
    </PageWrapperGame>
  )
}

export default RootRoulette
