import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ViewClubQuery } from '@//:artifacts/ViewClubQuery.graphql'
import { graphql } from 'react-relay'
import { useHistory } from '@//:modules/routing'

interface Props {
  query: PreloadedQuery<ViewClubQuery>
}

const Query = graphql`
  query ViewClubQuery($slug: String!) {
    club(slug: $slug) {
      name
    }
  }
`

export default function ViewClub (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ViewClubQuery>(
    Query,
    props.query
  )

  const history = useHistory()

  if (queryData.club == null) {
    history.push('/')
  }

  return (
    <>
      public page for club {queryData?.club?.name}
    </>
  )
}
