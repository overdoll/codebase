import { Flex, Heading, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostClickableCharactersFragment$key } from '@//:artifacts/PostClickableCharactersFragment.graphql'
import { ClickableBox, ResourceIcon } from '@//:modules/content/PageLayout'
import type { ResourceIconFragment$key } from '@//:artifacts/ResourceIconFragment.graphql'

interface Props {
  query: PostClickableCharactersFragment$key | null
}

const Fragment = graphql`
  fragment PostClickableCharactersFragment on Post {
    characters {
      name
      series {
        title
      }
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
          <ClickableBox variant='ghost' bg='transparent' borderRadius='xl' p={0}>
            <Flex align='center' borderRadius='inherit' bg='gray.800' px={3} py={3}>
              <ResourceIcon
                w={10}
                h='100%'
                mr={3}
                query={item.thumbnail as ResourceIconFragment$key}
              />
              <Flex w='100%' direction='column' align='space-between'>
                <Heading lineHeight={1} color='gray.00' fontSize='4xl'>{item.name}</Heading>
                <Text fontSize='sm' color='gray.200'>{item.series.title}</Text>
              </Flex>
            </Flex>
          </ClickableBox>
        </WrapItem>
      )}
    </Wrap>
  )
}
