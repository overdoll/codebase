import { Tag, TagLabel, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostStaticCharactersFragment$key } from '@//:artifacts/PostStaticCharactersFragment.graphql'

interface Props {
  query: PostStaticCharactersFragment$key
}

const Fragment = graphql`
  fragment PostStaticCharactersFragment on Post {
    characters {
      id
      name
      series {
        title
      }
    }
  }
`

export default function PostStaticCharacters ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Wrap>
      {data.characters.map((item) =>
        <WrapItem key={item.id}>
          <Tag size='lg' variant='solid' colorScheme='gray' borderRadius='full'>
            <TagLabel>{item.name} {item.series != null ? `(${item?.series?.title})` : ''}</TagLabel>
          </Tag>
        </WrapItem>
      )}
    </Wrap>
  )
}
