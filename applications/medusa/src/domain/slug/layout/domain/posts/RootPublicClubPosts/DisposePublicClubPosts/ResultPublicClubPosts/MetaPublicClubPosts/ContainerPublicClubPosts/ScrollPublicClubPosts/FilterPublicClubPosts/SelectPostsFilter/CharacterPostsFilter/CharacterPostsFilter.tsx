import { graphql, useFragment } from 'react-relay/hooks'
import { CharacterPostsFilterFragment$key } from '@//:artifacts/CharacterPostsFilterFragment.graphql'
import { FilterPostsRefetch } from '../../FilterPublicClubPosts'
import PostsFilterBox from '../PostsFilterBox/PostsFilterBox'

interface Props {
  loadQuery: FilterPostsRefetch
  query: CharacterPostsFilterFragment$key
  currentFilters: Record<string, any>
}

const Fragment = graphql`
  fragment CharacterPostsFilterFragment on Character {
    id
    slug
    series {
      slug
    }
    club {
      slug
    }
    name
  }
`

export default function CharacterPostsFilter (props: Props): JSX.Element {
  const {
    loadQuery,
    query,
    currentFilters
  } = props

  const data = useFragment(Fragment, query)

  const isActive = currentFilters?.characterSlugs?.[0] === data.slug && (currentFilters?.seriesSlugs?.[0] === data?.club?.slug || currentFilters?.seriesSlugs?.[0] === data?.series?.slug)
  const isInactive = !isActive && (currentFilters?.characterSlugs != null || currentFilters?.seriesSlugs != null || currentFilters?.categorySlugs != null)

  const onFilter = (): void => {
    if (isActive) {
      loadQuery({
        characterSlugs: null,
        seriesSlugs: null,
        categorySlugs: null
      })
      return
    }
    loadQuery({
      characterSlugs: [data.slug],
      seriesSlugs: [data?.club?.slug ?? data?.series?.slug],
      categorySlugs: null
    })
  }

  return (
    <PostsFilterBox
      onClick={onFilter}
      isInactive={isInactive}
      title={data.name}
      isActive={isActive}
      id={data.id}
    />
  )
}
