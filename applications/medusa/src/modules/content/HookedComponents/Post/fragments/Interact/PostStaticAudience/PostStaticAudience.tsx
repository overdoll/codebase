import { Tag, TagLabel, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostStaticAudienceFragment$key } from '@//:artifacts/PostStaticAudienceFragment.graphql'

interface Props {
  query: PostStaticAudienceFragment$key
}

const Fragment = graphql`
  fragment PostStaticAudienceFragment on Post {
    audience {
      title
    }
  }
`

export default function PostStaticAudience ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Wrap direction='column'>
      <WrapItem>
        <Tag size='lg' variant='solid' colorScheme='gray' borderRadius='full'>
          <TagLabel>{data?.audience?.title}</TagLabel>
        </Tag>
      </WrapItem>
    </Wrap>
  )
}
