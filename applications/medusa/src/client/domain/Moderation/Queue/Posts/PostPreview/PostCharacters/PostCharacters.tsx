import { Tag, TagLabel, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostCharactersFragment$key } from '@//:artifacts/PostCharactersFragment.graphql'

interface Props {
  query: PostCharactersFragment$key
}

const PostCharacterFragmentGQL = graphql`
  fragment PostCharactersFragment on Post {
    characters {
      name
      series {
        title
      }
    }
  }
`

export default function PostCharacters ({ query }: Props): JSX.Element {
  const data = useFragment(PostCharacterFragmentGQL, query)

  return (

    <Wrap>
      {data.characters.map((item, index) =>
        <WrapItem key={index}>
          <Tag size='lg' variant='outline' colorScheme='gray' borderRadius='full'>
            <TagLabel>{item.name} ({item.series.title})</TagLabel>
          </Tag>
        </WrapItem>
      )}
    </Wrap>
  )
}
