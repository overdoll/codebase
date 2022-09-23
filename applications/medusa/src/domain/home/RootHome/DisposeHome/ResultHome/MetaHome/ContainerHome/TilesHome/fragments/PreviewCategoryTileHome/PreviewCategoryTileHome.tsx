import { graphql } from 'react-relay'
import type { PreviewCategoryTileHomeFragment$key } from '@//:artifacts/PreviewCategoryTileHomeFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import CategoryLinkTile from '@//:modules/content/PageLayout/Display/fragments/Link/CategoryLinkTile/CategoryLinkTile'
import PreviewCategory
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PreviewCategory/PreviewCategory'
import trackFathomEvent from '@//:modules/support/trackFathomEvent'

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

  const onClick = (): void => {
    trackFathomEvent('LXYDGQ7I', 1)
  }

  return (
    <CategoryLinkTile onClick={onClick} query={data}>
      <PreviewCategory categoryQuery={data} />
    </CategoryLinkTile>
  )
}
