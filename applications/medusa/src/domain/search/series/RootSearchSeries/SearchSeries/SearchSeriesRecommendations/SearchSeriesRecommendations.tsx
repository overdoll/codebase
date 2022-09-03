import { graphql, useFragment } from 'react-relay/hooks'
import { SearchSeriesRecommendationsFragment$key } from '@//:artifacts/SearchSeriesRecommendationsFragment.graphql'
import { Wrap, WrapItem } from '@chakra-ui/react'
import ClickableCharacter
  from '@//:modules/content/Posts/components/PostInteraction/PostClickableCharacters/ClickableCharacter/ClickableCharacter'

interface Props {
  query: SearchSeriesRecommendationsFragment$key
}

const Fragment = graphql`
  fragment SearchSeriesRecommendationsFragment on Query {
    characters(seriesSlug: $seriesSlug, first: 3) {
      edges {
        node {
          id
          ...ClickableCharacterFragment
        }
      }
    }
  }
`

export default function SearchSeriesRecommendations ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Wrap overflow='show'>
      {data.characters.edges.map((item, index) =>
        <WrapItem key={item.node.id}>
          <ClickableCharacter query={item.node} />
        </WrapItem>
      )}
    </Wrap>
  )
}
