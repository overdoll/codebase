import { Flex, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { PostClickableCategoriesFragment$key } from '@//:artifacts/PostClickableCategoriesFragment.graphql'
import { ClickableBox, ResourceIcon } from '@//:modules/content/PageLayout'
import type { ResourceIconFragment$key } from '@//:artifacts/ResourceIconFragment.graphql'

interface Props {
  query: PostClickableCategoriesFragment$key
}

const Fragment = graphql`
  fragment PostClickableCategoriesFragment on Post {
    categories {
      title
      thumbnail {
        ...ResourceIconFragment
      }
    }
  }
`

export default function PostClickableCategories ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Wrap>
      {data.categories.map((item, index) =>
        <WrapItem key={index}>
          <ClickableBox variant='ghost' bg='transparent' borderRadius='xl' p={0}>
            <Flex align='center' borderRadius='inherit' bg='gray.800' px={2} py={2}>
              <ResourceIcon mr={2} query={item.thumbnail as ResourceIconFragment$key} />
              <Text fontWeight='semibold' color='gray.00' fontSize='xl'>{item.title}</Text>
            </Flex>
          </ClickableBox>
        </WrapItem>
      )}
    </Wrap>
  )
}
