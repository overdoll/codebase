import { Tag, TagLabel, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostStaticRequestCharactersFragment$key } from '@//:artifacts/PostStaticRequestCharactersFragment.graphql'
import { Trans } from '@lingui/macro'

interface Props {
  query: PostStaticRequestCharactersFragment$key
}

const Fragment = graphql`
  fragment PostStaticRequestCharactersFragment on Post {
    characterRequests {
      id
      name
    }
  }
`

export default function PostStaticRequestCharacters ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Wrap>
      {data.characterRequests.map((item) =>
        <WrapItem key={item.id}>
          <Tag size='lg' variant='solid' colorScheme='gray' borderRadius='full'>
            <TagLabel>
              <Trans>
                {item.name} (Requested)
              </Trans>
            </TagLabel>
          </Tag>
        </WrapItem>
      )}
    </Wrap>
  )
}
