import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { BlurbClubSettingsQuery } from '@//:artifacts/BlurbClubSettingsQuery.graphql'
import ChangeClubBlurbForm from './ChangeClubBlurbForm/ChangeClubBlurbForm'
import { NotFoundClub } from '@//:modules/content/Placeholder'

interface Props {
  query: PreloadedQuery<BlurbClubSettingsQuery>
}

const Query = graphql`
  query BlurbClubSettingsQuery($slug: String!) {
    club(slug: $slug) {
      ...ChangeClubBlurbFormFragment
    }
  }
`

export default function BlurbClubSettings ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<BlurbClubSettingsQuery>(
    Query,
    query
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  return (
    <ChangeClubBlurbForm query={queryData.club} />
  )
}
