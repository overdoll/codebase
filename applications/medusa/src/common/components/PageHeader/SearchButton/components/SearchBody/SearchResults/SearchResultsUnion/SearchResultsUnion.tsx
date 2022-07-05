import { graphql, useFragment } from 'react-relay/hooks'
import type { SearchResultsUnionFragment$key } from '@//:artifacts/SearchResultsUnionFragment.graphql'
import SearchResultsClub from './SearchResultsClub/SearchResultsClub'
import SearchResultsCharacter from './SearchResultsCharacter/SearchResultsCharacter'
import SearchResultsSeries from './SearchResultsSeries/SearchResultsSeries'
import SearchResultsCategory from './SearchResultsCategory/SearchResultsCategory'

interface Props {
  query: SearchResultsUnionFragment$key
}

const Fragment = graphql`
  fragment SearchResultsUnionFragment on Search {
    __typename
    ...on Character {
      ...SearchResultsCharacterFragment
    }
    ...on Series {
      ...SearchResultsSeriesFragment
    }
    ...on Club {
      ...SearchResultsClubFragment
    }
    ...on Category {
      ...SearchResultsCategoryFragment
    }
  }
`

export default function SearchResultsUnion ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  switch (data.__typename) {
    case 'Club':
      return <SearchResultsClub query={data} />
    case 'Character':
      return <SearchResultsCharacter query={data} />
    case 'Series':
      return <SearchResultsSeries query={data} />
    case 'Category':
      return <SearchResultsCategory query={data} />
    default:
      return <></>
  }
}
