import { graphql, useFragment } from 'react-relay/hooks'
import type { SearchResultsCategoryFragment$key } from '@//:artifacts/SearchResultsCategoryFragment.graphql'
import { CategoryTileOverlay, LinkTile } from '@//:modules/content/ContentSelection'

interface Props {
  query: SearchResultsCategoryFragment$key
  onClick?: () => void
}

const Fragment = graphql`
  fragment SearchResultsCategoryFragment on Category {
    slug
    ...CategoryTileOverlayFragment
  }
`

export default function SearchResultsCategory (props: Props): JSX.Element {
  const {
    query,
    onClick
  } = props

  const data = useFragment(Fragment, query)

  return (
    <LinkTile
      onClick={onClick}
      href={{
        pathname: '/search/category/[categorySlug]',
        query: {
          categorySlug: data.slug
        }
      }}
    >
      <CategoryTileOverlay query={data} />
    </LinkTile>
  )
}
