import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminCreateCharacterQuery } from '@//:artifacts/AdminCreateCharacterQuery.graphql'
import CreateCharacterForm from './CreateCharacterForm/CreateCharacterForm'

interface Props {
  query: PreloadedQuery<AdminCreateCharacterQuery>
}

const Query = graphql`
  query AdminCreateCharacterQuery($first: Int, $after: String) {
    characters (first: $first, after: $after)
    @connection(key: "AdminCharactersConnection_characters") {
      __id
      edges {
        __typename
      }
    }
  }
`

export default function AdminCreateCharacter (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminCreateCharacterQuery>(
    Query,
    props.query
  )

  return (
    <CreateCharacterForm connectionId={queryData?.characters.__id} />
  )
}
