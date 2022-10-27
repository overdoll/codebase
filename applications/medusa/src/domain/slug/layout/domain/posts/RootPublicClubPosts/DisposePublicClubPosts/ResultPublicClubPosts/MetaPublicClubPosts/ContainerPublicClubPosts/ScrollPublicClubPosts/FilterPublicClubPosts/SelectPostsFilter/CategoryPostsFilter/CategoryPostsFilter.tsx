import { graphql, useFragment } from 'react-relay/hooks'
import { CategoryPostsFilterFragment$key } from '@//:artifacts/CategoryPostsFilterFragment.graphql'
import { FilterPostsRefetch } from '../../FilterPublicClubPosts'
import PostsFilterBox from '../PostsFilterBox/PostsFilterBox'

interface Props {
  loadQuery: FilterPostsRefetch
  query: CategoryPostsFilterFragment$key
  currentFilters: Record<string, any>
}

const Fragment = graphql`
  fragment CategoryPostsFilterFragment on Category {
    id
    slug
    title
  }
`

export default function CategoryPostsFilter (props: Props): JSX.Element {
  const {
    loadQuery,
    query,
    currentFilters
  } = props

  const data = useFragment(Fragment, query)

  const isActive = currentFilters?.categorySlugs?.[0] === data.slug
  const isInactive = !isActive && (currentFilters?.characterSlugs != null || currentFilters?.seriesSlugs != null || currentFilters?.categorySlugs != null)

  const onFilter = (): void => {
    if (isActive) {
      loadQuery({
        categorySlugs: null,
        characterSlugs: null,
        seriesSlugs: null,
        clubCharacterSlugs: null
      })
      return
    }
    loadQuery({
      categorySlugs: [data.slug],
      characterSlugs: null,
      seriesSlugs: null,
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
