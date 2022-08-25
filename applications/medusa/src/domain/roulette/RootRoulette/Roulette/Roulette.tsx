import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { RouletteQuery } from '@//:artifacts/RouletteQuery.graphql'
import { graphql } from 'react-relay'
import ShowRouletteSession from './ShowRouletteSession/ShowRouletteSession'
import CreateRouletteSession from './CreateRouletteSession/CreateRouletteSession'
import { Grid, GridItem } from '@chakra-ui/react'
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

  const RouletteSession = (): JSX.Element => {
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

  return (
    <Grid templateRows='30px 1fr 12vh' gap={1} templateColumns='100%' h='92vh' w='100%'>
      <RouletteSession />
    </Grid>
  )
}
