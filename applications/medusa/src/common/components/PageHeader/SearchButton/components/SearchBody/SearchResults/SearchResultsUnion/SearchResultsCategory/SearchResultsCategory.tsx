import { graphql, useFragment } from 'react-relay/hooks'
import type { SearchResultsCategoryFragment$key } from '@//:artifacts/SearchResultsCategoryFragment.graphql'
import { CategoryTileOverlay, LinkTile } from '@//:modules/content/ContentSelection'
import useHistoryDisclosureContext
  from '@//:modules/content/HookedComponents/HistoryDisclosure/hooks/useHistoryDisclosureContext'

interface Props {
  query: SearchResultsCategoryFragment$key
}

const Fragment = graphql`
  fragment SearchResultsCategoryFragment on Category {
    slug
    ...CategoryTileOverlayFragment
  }
`

export default function SearchResultsCategory ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const { onClose } = useHistoryDisclosureContext()

  return (
    <LinkTile
      onClick={onClose}
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
