import { graphql } from 'react-relay'
import type { PreviewCategoryTileHomeFragment$key } from '@//:artifacts/PreviewCategoryTileHomeFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import CategoryLinkTile from '@//:modules/content/PageLayout/Display/fragments/Link/CategoryLinkTile/CategoryLinkTile'
import PreviewCategory
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PreviewCategory/PreviewCategory'

const Fragment = graphql`
  fragment PreviewCategoryTileHomeFragment on Category {
    ...PreviewCategoryFragment
    ...CategoryLinkTileFragment
  }
`

interface Props {
  categoryQuery: PreviewCategoryTileHomeFragment$key
}

export default function PreviewCategoryTileHome (props: Props): JSX.Element {
  const {
    categoryQuery
  } = props

  const data = useFragment(Fragment, categoryQuery)

  return (
    <CategoryLinkTile query={data}>
      <PreviewCategory categoryQuery={data} />
    </CategoryLinkTile>
  )
}
