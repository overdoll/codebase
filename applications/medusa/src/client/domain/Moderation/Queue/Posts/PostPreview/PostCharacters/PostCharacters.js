/**
 * @flow
 */

import { Tag, TagLabel, Tooltip, Wrap, WrapItem } from '@chakra-ui/react'
import type { Node } from 'react'
import { useFragment, graphql } from 'react-relay'
import type { PostCharactersFragment$key } from '@//:artifacts/PostCharactersFragment.graphql'
import { useTranslation } from 'react-i18next'

type Props = {
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

export default function PostCharacters ({ query }: Props): Node {
  const [t] = useTranslation('moderation')

  const data = useFragment(PostCharacterFragmentGQL, query)

  return (

    <Wrap>
      {data.characters.map((item, index) =>
        <WrapItem key={index}>
          <Tag size='lg' colorScheme='purple' borderRadius='full'>
            <TagLabel>{item.name} ({item.series.title})</TagLabel>
          </Tag>
        </WrapItem>
      )}
    </Wrap>
  )
}
