import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { BrandsQuery } from '@//:artifacts/BrandsQuery.graphql'
import { RowItem, RowWrap, Selector } from '../../../../../../../../../../components/ContentSelection'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import type { ResourceItemFragment$key } from '@//:artifacts/ResourceItemFragment.graphql'

interface Props {
  selected: string | null
  onSelect: (id: string) => void
}

const Query = graphql`
  query BrandsQuery {
    clubs {
      edges {
        node {
          id
          name
          slug
          thumbnail {
            ...ResourceItemFragment
          }
        }
      }
    }
  }
`

export default function Brands ({
  onSelect,
  selected
}: Props): JSX.Element {
  const data = useLazyLoadQuery<BrandsQuery>(
    Query,
    {}
  )

  return (
    <RowWrap>
      {data.brands.edges.map((item, index) => (
        <RowItem h={82} key={index}>
          <Selector
            onSelect={onSelect}
            selected={(selected != null) ? [selected] : []}
            id={item.node.id}
          >
            <Flex
              mx={2}
              my={1}
              align='center'
            >
              <Flex align='center' justify='center' mr={3} ml={1} borderRadius='md' overflow='hidden' w={12} h={12}>
                <ResourceItem query={item?.node?.thumbnail as ResourceItemFragment$key} />
              </Flex>
              <Box>
                <Heading fontSize='xl' color='gray.00'>
                  {item.node.name}
                </Heading>
                <Text
                  color='gray.200'
                  textAlign='left'
                  fontSize='sm'
                >
                  /{item.node.slug}
                </Text>
              </Box>
            </Flex>
          </Selector>
        </RowItem>
      )
      )}
    </RowWrap>
  )
}
