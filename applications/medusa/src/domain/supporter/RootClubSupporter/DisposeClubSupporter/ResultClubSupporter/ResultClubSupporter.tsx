import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultClubSupporterQuery } from '@//:artifacts/ResultClubSupporterQuery.graphql'
import { graphql } from 'react-relay'
import ContainerClubSupporter from './ContainerClubSupporter/ContainerClubSupporter'
import SupporterRichObject from './SupporterRichObject/SupporterRichObject'

interface Props {
  query: PreloadedQuery<ResultClubSupporterQuery>
}

const Query = graphql`
  query ResultClubSupporterQuery @preloadable {
    ...ContainerClubSupporterFragment
  }
`

export default function ResultClubSupporter (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultClubSupporterQuery>(
    Query,
    query
  )

  return (
    <>
      <ContainerClubSupporter rootQuery={queryData} />
      <SupporterRichObject />
    </>
  )
}
