import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffCreateCharacterQuery } from '@//:artifacts/StaffCreateCharacterQuery.graphql'
import CreateCharacterForm from './CreateCharacterForm/CreateCharacterForm'

interface Props {
  query: PreloadedQuery<StaffCreateCharacterQuery>
}

const Query = graphql`
  query StaffCreateCharacterQuery($first: Int, $after: String) {
    characters (first: $first, after: $after)
    @connection(key: "StaffCharactersConnection_characters") {
      __id
      edges {
        __typename
      }
    }
  }
`

export default function StaffCreateCharacter (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffCreateCharacterQuery>(
    Query,
    props.query
  )

  return (
    <CreateCharacterForm connectionId={queryData?.characters.__id} />
  )
}
