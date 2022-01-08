import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubHomeQuery } from '@//:artifacts/ClubHomeQuery.graphql'

interface Props {
  query: PreloadedQuery<ClubHomeQuery>
}

const Query = graphql`
  query ClubHomeQuery($slug: String!) {
    club(slug: $slug) {
      name
    }
  }
`

export default function ClubHome ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubHomeQuery>(
    Query,
    query
  )

  return (
    <>home for club {queryData?.club?.name}</>
  )
}
