import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { SelectClubsQuery } from '@//:artifacts/SelectClubsQuery.graphql'
import { useHistory } from '@//:modules/routing'

interface Props {
  query: PreloadedQuery<SelectClubsQuery>
}

const Query = graphql`
  query SelectClubsQuery($slug: String!) {
    club(slug: $slug) {
      slug
    }
  }
`

export default function SelectClubs ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<SelectClubsQuery>(
    Query,
    query
  )

  const history = useHistory()

  if (queryData.club == null) {
    history.push('/')
  }

  return (
    <>{queryData?.club?.slug}</>
  )
}
