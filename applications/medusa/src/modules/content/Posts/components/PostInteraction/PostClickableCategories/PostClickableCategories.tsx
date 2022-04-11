import { Flex, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostClickableCategoriesFragment$key } from '@//:artifacts/PostClickableCategoriesFragment.graphql'
import { ClickableBox, ResourceIcon } from '../../../../PageLayout'
import { encodeQueryParams } from 'serialize-query-params'
import { stringify } from 'query-string'
import { useHistory } from '../../../../../routing'
import { configMap } from '../../PostNavigation/PostsSearch/constants'

interface Props {
  query: PostClickableCategoriesFragment$key | null
}

const Fragment = graphql`
  fragment PostClickableCategoriesFragment on Post {
    categories {
      slug
      title
      thumbnail {
        ...ResourceIconFragment
      }
    }
  }
`

export default function PostClickableCategories ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const history = useHistory()

  const onClick = (node): void => {
    const encodedQuery = encodeQueryParams(configMap, {
      categories: node.slug,
      sort: 'TOP'
    })

    history.push(`/search?${stringify(encodedQuery)}`)
  }

  return (
    <Wrap>
      {data?.categories.map((item, index) =>
        <WrapItem key={index}>
          <ClickableBox onClick={() => onClick(item)} variant='ghost' bg='transparent' borderRadius='xl' p={0}>
            <Flex align='center' borderRadius='inherit' bg='gray.800' px={2} py={2}>
              <ResourceIcon mr={2} query={item.thumbnail} />
              <Text fontWeight='semibold' color='gray.00' fontSize='xl'>{item.title}</Text>
            </Flex>
          </ClickableBox>
        </WrapItem>
      )}
    </Wrap>
  )
}
