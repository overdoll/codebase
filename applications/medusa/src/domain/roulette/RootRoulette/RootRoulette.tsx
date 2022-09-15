import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultRouletteQuery as ResultRouletteQueryType } from '@//:artifacts/ResultRouletteQuery.graphql'
import ResultRouletteQuery from '@//:artifacts/ResultRouletteQuery.graphql'
import { PageProps } from '@//:types/app'
import DisposeRoulette from './DisposeRoulette/DisposeRoulette'

interface Props {
  queryRefs: {
    rouletteQuery: PreloadedQuery<ResultRouletteQueryType>
  }
}

const RootRoulette: PageProps<Props> = (props: Props): JSX.Element => {
  const { queryRefs: { rouletteQuery } } = props

  const params = useQueryLoader(
    ResultRouletteQuery,
    rouletteQuery
  )

  return (
    <DisposeRoulette params={params} />
  )
}

export default RootRoulette
