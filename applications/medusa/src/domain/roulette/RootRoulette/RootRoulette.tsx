import { Suspense } from 'react'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import type { RouletteQuery as RouletteQueryType } from '@//:artifacts/RouletteQuery.graphql'
import RouletteQuery from '@//:artifacts/RouletteQuery.graphql'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { PageProps } from '@//:types/app'
import Roulette from './Roulette/Roulette'
import PageWrapperGame from './Roulette/PageWrapperGame/PageWrapperGame'
import { SequenceResolver } from '@//:modules/content/HookedComponents/Sequence/types'
import { SequenceProvider, useSequence, ValueResolver } from '@//:modules/content/HookedComponents/Sequence'
import { useQueryParam } from 'use-query-params'
import { useUpdateEffect } from '@chakra-ui/react'

interface Props {
  queryRefs: {
    rouletteQuery: PreloadedQuery<RouletteQueryType>
  }
}

interface SequenceProps {
  gameSessionId: string | null
  diceOne: number | null
  diceTwo: number | null
  diceThree: number | null
  post: any | null
  isClosed: boolean
  tutorialCompleted: boolean
}

const defaultValue: SequenceProps = {
  gameSessionId: null,
  diceOne: null,
  diceTwo: null,
  diceThree: null,
  post: null,
  isClosed: false,
  tutorialCompleted: false
}

const resolver: SequenceResolver<SequenceProps> = {
  gameSessionId: ValueResolver(),
  diceOne: ValueResolver(),
  diceTwo: ValueResolver(),
  diceThree: ValueResolver(),
  post: ValueResolver(),
  isClosed: ValueResolver(),
  tutorialCompleted: ValueResolver()
}

const RootRoulette: PageProps<Props> = (props: Props): JSX.Element => {
  const { queryRefs: { rouletteQuery } } = props

  const [gameSessionId] = useQueryParam<string | null | undefined>('gameSessionId')

  const [queryRef, loadQuery] = useQueryLoader(
    RouletteQuery,
    rouletteQuery)

  const loadRoulette = (): void => {
    loadQuery({
      reference: gameSessionId ?? ''
    })
  }

  const methods = useSequence<SequenceProps>({
    defaultValue: defaultValue,
    resolver: resolver
  })

  useUpdateEffect(() => {
    loadRoulette()
  }, [gameSessionId])

  return (
    <>
      <PageWrapperGame>
        <SequenceProvider {...methods}>
          <QueryErrorBoundary loadQuery={loadRoulette}>
            <Suspense fallback={<SkeletonPost />}>
              <Roulette query={queryRef as PreloadedQuery<RouletteQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </SequenceProvider>
      </PageWrapperGame>
    </>
  )
}

export default RootRoulette
