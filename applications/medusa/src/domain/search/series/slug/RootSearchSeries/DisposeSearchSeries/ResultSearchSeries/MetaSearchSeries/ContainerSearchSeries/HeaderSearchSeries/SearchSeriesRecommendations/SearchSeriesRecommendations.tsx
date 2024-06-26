import { graphql, useFragment } from 'react-relay/hooks'
import { SearchSeriesRecommendationsFragment$key } from '@//:artifacts/SearchSeriesRecommendationsFragment.graphql'
import { Wrap, WrapItem } from '@chakra-ui/react'
import ClickableCharacter
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostClickableCharacters/ClickableCharacter/ClickableCharacter'

interface Props {
  query: SearchSeriesRecommendationsFragment$key
}

const Fragment = graphql`
  fragment SearchSeriesRecommendationsFragment on Series {
    characters(first: 5) {
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
