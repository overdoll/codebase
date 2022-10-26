import { SelectPostsFilterFragment$key } from '@//:artifacts/SelectPostsFilterFragment.graphql'
import { graphql, useFragment } from 'react-relay/hooks'
import CategoryPostsFilter from './CategoryPostsFilter/CategoryPostsFilter'
import { FilterPostsRefetch } from '../FilterPublicClubPosts'
import CharacterPostsFilter from './CharacterPostsFilter/CharacterPostsFilter'
import SeriesPostsFilter from './SeriesPostsFilter/SeriesPostsFilter'

interface Props {
  loadQuery: FilterPostsRefetch
  query: SelectPostsFilterFragment$key
  currentFilters: Record<string, any>
}

const Fragment = graphql`
  fragment SelectPostsFilterFragment on Search {
    __typename
    ...on Category {
      ...CategoryPostsFilterFragment
    }
    ...on Series {
      ...SeriesPostsFilterFragment
    }
    ...on Character {
      ...CharacterPostsFilterFragment
    }
  }
`

export default function SelectPostsFilter (props: Props): JSX.Element {
  const {
    loadQuery,
    query,
    currentFilters
  } = props

  const data = useFragment(Fragment, query)

  switch (data.__typename) {
    case 'Category':
      return (
        <CategoryPostsFilter currentFilters={currentFilters} loadQuery={loadQuery} query={data} />
      )
    case 'Series':
      return (
        <SeriesPostsFilter currentFilters={currentFilters} loadQuery={loadQuery} query={data} />
      )
    case 'Character':
      return (
        <CharacterPostsFilter currentFilters={currentFilters} loadQuery={loadQuery} query={data} />
      )
    default:
      return <></>
  }
}
