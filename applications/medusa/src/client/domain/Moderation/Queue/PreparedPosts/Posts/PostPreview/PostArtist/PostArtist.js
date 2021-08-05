/**
 * @flow
 */

import { Tag, TagLabel, Wrap, WrapItem } from '@chakra-ui/react'
import type { Node } from 'react'
import { useFragment, graphql } from 'react-relay'
import type { PostArtistFragment$key } from '@//:artifacts/PostArtistFragment.graphql'

type Props = {
  artist: PostArtistFragment$key
}

const PostArtistFragmentGQL = graphql`
  fragment PostArtistFragment on Post {
    artist {
      username
    }
  }
`

export default function PostHeader (props: Props): Node {
  const data = useFragment(PostArtistFragmentGQL, props.artist)

  return (

    <Wrap direction='column'>
      <WrapItem>
        <Tag size='lg' colorScheme='gray' borderRadius='full'>
          <TagLabel>{data?.artist.username}</TagLabel>
        </Tag>
      </WrapItem>
    </Wrap>
  )
}
