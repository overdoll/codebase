import { graphql, useFragment } from 'react-relay/hooks'
import { SearchCategoryRecommendationsFragment$key } from '@//:artifacts/SearchCategoryRecommendationsFragment.graphql'
import { Wrap, WrapItem } from '@chakra-ui/react'
import ClickableCategory
  from '@//:modules/content/Posts/components/PostInteraction/PostClickableCategories/ClickableCategory/ClickableCategory'

interface Props {
  query: SearchCategoryRecommendationsFragment$key
}

const Fragment = graphql`
  fragment SearchCategoryRecommendationsFragment on Query {
    categories(first: 7) {
      edges {
        node {
          id
          ...ClickableCategoryFragment
        }
      }
    }
  }
`

export default function SearchCategoryRecommendations ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Wrap overflow='show'>
      {data.categories.edges.map((item, index) =>
        <WrapItem key={item.node.id}>
          <ClickableCategory query={item.node} />
        </WrapItem>
      )}
    </Wrap>
  )
}
