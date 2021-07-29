/**
 * @flow
 */

import { Tag, TagLabel, Tooltip, Wrap, WrapItem } from '@chakra-ui/react'
import type { Node } from 'react'
import { useFragment, graphql } from 'react-relay'
import type { PostCharactersFragment$key } from '@//:artifacts/PostCharactersFragment.graphql'
import { useTranslation } from 'react-i18next'

type Props = {
  characters: PostCharactersFragment$key
}

const postCharacterFragmentGQL = graphql`
  fragment PostCharactersFragment on Post {
    characterRequests {
      name
      media
    }
    characters {
      name
      media {
        title
      }
    }
    mediaRequests
  }
`

export default function PostHeader (props: Props): Node {
  const [t] = useTranslation('moderation')

  const data = useFragment(postCharacterFragmentGQL, props.characters)

  // TODO differentiate between requests and existing tags more clearly
  // ex. no brackets for characters that exist?

  return (

    <Wrap>
      {data.characters.map((item, index) =>
        <WrapItem key={index}>
          <Tag size='lg' colorScheme='gray' borderRadius='full'>
            <TagLabel>{item.name} ({item.media.title})</TagLabel>
          </Tag>
        </WrapItem>
      )}
      {data.characterRequests?.map((item, index) =>
        <WrapItem key={index}>
          <Tooltip label={t('queue.post.tags.new')}>
            <Tag size='lg' colorScheme='green' borderRadius='full'>
              <TagLabel>{item.name} ({item.media})</TagLabel>
            </Tag>
          </Tooltip>
        </WrapItem>
      )}
    </Wrap>
  )
}
