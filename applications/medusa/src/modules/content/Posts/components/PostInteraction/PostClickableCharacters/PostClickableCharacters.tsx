import { Flex, Stack, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostClickableCharactersFragment$key } from '@//:artifacts/PostClickableCharactersFragment.graphql'
import { ResourceIcon, SmallBackgroundBox } from '../../../../PageLayout'
import type { ResourceIconFragment$key } from '@//:artifacts/ResourceIconFragment.graphql'
import ClickCharacter from './ClickCharacter/ClickCharacter'
import ClickSeries from './ClickSeries/ClickSeries'

interface Props {
  query: PostClickableCharactersFragment$key | null
}

const Fragment = graphql`
  fragment PostClickableCharactersFragment on Post {
    characters {
      ...ClickSeriesFragment
      ...ClickCharacterFragment
      thumbnail {
        ...ResourceIconFragment
      }
    }
  }
`

export default function PostClickableCharacters ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Wrap>
      {data?.characters.map((item, index) =>
        <WrapItem key={index}>
          <SmallBackgroundBox p={2} borderRadius='lg'>
            <Flex align='center' borderRadius='inherit' bg='gray.800'>
              <ResourceIcon
                w={10}
                h={10}
                mr={3}
                query={item.thumbnail as ResourceIconFragment$key}
              />
              <Stack spacing={1}>
                <ClickCharacter query={item} />
                <ClickSeries query={item} />
              </Stack>
            </Flex>
          </SmallBackgroundBox>
        </WrapItem>
      )}
    </Wrap>
  )
}
