import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultRouletteQuery } from '@//:artifacts/ResultRouletteQuery.graphql'
import { graphql } from 'react-relay'
import MetaRoulette from './MetaRoulette/MetaRoulette'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const LazyBanner = dynamic(
  async () => {
    return await import('@//:modules/content/HookedComponents/Filters/components/JoinBrowseBanner/JoinBrowseBanner')
  },
  { suspense: true }
)

interface Props {
  query: PreloadedQuery<ResultRouletteQuery>
}

const Query = graphql`
  query ResultRouletteQuery($reference: String!) @preloadable {
    gameSessionStatus(reference: $reference) {
      ...MetaRouletteFragment
    }
    viewer {
      __typename
    }
  }
`

export default function ResultRoulette (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultRouletteQuery>(
    Query,
    query
  )

  return (
    <>
      <Suspense fallback={<></>}>
        {queryData.viewer == null && (
          <LazyBanner />
        )}
      </Suspense>
      <MetaRoulette gameSessionStatusQuery={queryData?.gameSessionStatus} />
    </>
  )
}
