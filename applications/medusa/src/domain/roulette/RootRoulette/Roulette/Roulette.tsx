import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { RouletteQuery } from '@//:artifacts/RouletteQuery.graphql'
import { graphql } from 'react-relay'
import ShowRouletteSession from './ShowRouletteSession/ShowRouletteSession'
import CreateRouletteSession from './CreateRouletteSession/CreateRouletteSession'
import { GridItem } from '@chakra-ui/react'
import { useQueryParam } from 'use-query-params'

interface Props {
  query: PreloadedQuery<RouletteQuery>
}

const Query = graphql`
  query RouletteQuery($reference: String!) @preloadable {
    gameSessionStatus(reference: $reference) {
      __typename
      ...on RouletteStatus {
        ...ShowRouletteSessionFragment
      }
    }
    viewer {
      ...ShowRouletteSessionViewerFragment
    }
  }
`

export default function Roulette (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<RouletteQuery>(
    Query,
    query
  )

  const [gameSessionId] = useQueryParam<string | null | undefined>('gameSessionId')

  if (gameSessionId != null && queryData?.gameSessionStatus == null) {
    return <GridItem>loading session</GridItem>
  }

  if (queryData.gameSessionStatus != null) {
    if (queryData.gameSessionStatus.__typename === 'RouletteStatus') {
      return <ShowRouletteSession query={queryData.gameSessionStatus} viewerQuery={queryData.viewer} />
    }

    return <></>
  }

  return <CreateRouletteSession />
}
