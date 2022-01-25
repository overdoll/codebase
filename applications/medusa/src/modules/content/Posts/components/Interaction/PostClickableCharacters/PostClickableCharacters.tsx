import { Flex, Heading, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostClickableCharactersFragment$key } from '@//:artifacts/PostClickableCharactersFragment.graphql'
import { ClickableBox, ResourceIcon } from '../../../../PageLayout'
import type { ResourceIconFragment$key } from '@//:artifacts/ResourceIconFragment.graphql'
import { ArrayParam, encodeQueryParams, StringParam } from 'serialize-query-params'
import { stringify } from 'query-string'
import { useHistory } from '../../../../../routing'

interface Props {
  query: PostClickableCharactersFragment$key | null
}

const Fragment = graphql`
  fragment PostClickableCharactersFragment on Post {
    characters {
      name
      slug
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

  const history = useHistory()

  const onClick = (node): void => {
    const encodedQuery = encodeQueryParams({
      characters: ArrayParam,
      sort: StringParam
    }, {
      characters: node.slug,
      sort: 'TOP'
    })

    history.push(`/search?${stringify(encodedQuery)}`)
  }

  return (
    <Wrap>
      {data?.characters.map((item, index) =>
        <WrapItem key={index}>
          <ClickableBox onClick={() => onClick(item)} variant='ghost' borderRadius='xl' p={0}>
            <Flex align='center' borderRadius='inherit' bg='gray.800' px={4} py={3}>
              <ResourceIcon
                w={10}
                h={10}
                mr={3}
                query={item.thumbnail as ResourceIconFragment$key}
              />
              <Flex w='100%' direction='column' align='space-between'>
                <Heading lineHeight={1} color='gray.00' fontSize='3xl'>{item.name}</Heading>
                <Text fontSize='md' color='gray.200'>{item.series.title}</Text>
              </Flex>
            </Flex>
          </ClickableBox>
        </WrapItem>
      )}
    </Wrap>
  )
}
