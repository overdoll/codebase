import { graphql, useFragment } from 'react-relay/hooks'
import { SeriesPostsFilterFragment$key } from '@//:artifacts/SeriesPostsFilterFragment.graphql'
import { FilterPostsRefetch } from '../../FilterPublicClubPosts'
import PostsFilterBox from '../PostsFilterBox/PostsFilterBox'

interface Props {
  loadQuery: FilterPostsRefetch
  query: SeriesPostsFilterFragment$key
  currentFilters: Record<string, any>
}

const Fragment = graphql`
  fragment SeriesPostsFilterFragment on Series {
    id
    slug
    title
  }
`

export default function SeriesPostsFilter (props: Props): JSX.Element {
  const {
    loadQuery,
    query,
    currentFilters
  } = props

  const data = useFragment(Fragment, query)

  const isActive = currentFilters?.seriesSlugs?.[0] === data.slug && currentFilters?.characterSlugs == null
  const isInactive = !isActive && (currentFilters?.characterSlugs != null || currentFilters?.seriesSlugs != null || currentFilters?.categorySlugs != null)

  const onFilter = (): void => {
    if (isActive) {
      loadQuery({
        characterSlugs: null,
        seriesSlugs: null,
        categorySlugs: null,
        clubCharacterSlugs: null
      })
      return
    }
    loadQuery({
      characterSlugs: null,
      seriesSlugs: [data.slug],
      categorySlugs: null,
      clubCharacterSlugs: null
    })
  }

  return (
    <PostsFilterBox
      onClick={onFilter}
      isInactive={isInactive}
      title={data.title}
      isActive={isActive}
      id={data.id}
    />
  )
}
