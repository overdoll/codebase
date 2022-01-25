import { graphql } from 'react-relay/hooks'
import type { SearchCharactersQuery } from '@//:artifacts/SearchCharactersQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { removeNode } from '@//:modules/support'
import { Flex, Stack, Text } from '@chakra-ui/react'
import { GridWrap, RectangleGridItem, Selector } from '../../../../ContentSelection'
import ItemOverlay from '../../../../ContentSelection/components/ItemOverlay/ItemOverlay'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { Trans } from '@lingui/macro'
import { SearchCategoriesSelectorFragment$key } from '@//:artifacts/SearchCategoriesSelectorFragment.graphql'
import LoadMoreRectangle from '../../../../ContentSelection/components/LoadMoreRectangle/LoadMoreRectangle'
import { Icon } from '@//:modules/content'
import { CharacterIdentifier } from '@//:assets/icons/interface'
import { useEffect } from 'react'

interface Props {
  selected: string[]
  onSelect: (category: any) => void
  query: SearchCategoriesSelectorFragment$key
  showEmptyPlaceholder?: boolean
  onDataChange?: (data) => void
}

const SearchCharactersFragmentGQL = graphql`
  fragment SearchCharactersSelectorFragment on Query
  @argumentDefinitions(
    after: {type: String},
    name: {type: String}
  )
  @refetchable(queryName: "SearchCharactersSelectorPaginationFragment" )
  {
    characters (
      first: $first,
      after: $after,
      name: $search
    ) @connection(key: "SearchCharactersSelector_characters")
    {
      edges {
        node {
          id
          name
          series {
            title
          }
          slug
          thumbnail {
            ...ResourceItemFragment
          }
        }
      }
    }
  }
`

export default function SearchCharactersSelector ({
  onSelect,
  selected,
  query,
  showEmptyPlaceholder = true,
  onDataChange
}: Props): JSX.Element {
  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<SearchCharactersQuery, any>(
    SearchCharactersFragmentGQL,
    query
  )

  const characters = removeNode(data.characters.edges)

  const onChangeSelection = (id): void => {
    const character = characters.filter((item) => item.id === id)[0]
    onSelect(character)
  }

  useEffect(() => {
    onDataChange?.(data)
  }, [data])

  if (characters.length < 1 && !showEmptyPlaceholder) {
    return <></>
  }

  if (characters.length < 1 && showEmptyPlaceholder) {
    return (
      <Flex px={4} py={4} bg='gray.800' borderRadius='md' h={100} justify='center' align='center'>
        <Text color='gray.200' textAlign='center' fontSize='lg'>
          <Trans>
            No characters were found
          </Trans>
        </Text>
      </Flex>
    )
  }

  return (
    <>
      <GridWrap justify='center'>
        {characters.map((item, index) => (
          <RectangleGridItem key={index}>
            <Selector
              onSelect={onChangeSelection}
              selected={selected}
              id={item.id}
            >
              <ItemOverlay background={<ResourceItem
                query={item.thumbnail}
                                       />}
              >
                <Stack spacing={1}>
                  <Icon w={4} h={4} icon={CharacterIdentifier} fill='gray.00' />
                  <Text
                    fontSize='lg'
                    color='gray.00'
                    textAlign='center'
                  >
                    {item.name}
                  </Text>
                  <Text
                    textAlign='center'
                    fontSize='sm'
                    color='gray.100'
                  >
                    {item.series.title}
                  </Text>
                </Stack>
              </ItemOverlay>
            </Selector>
          </RectangleGridItem>
        )
        )}
        <LoadMoreRectangle
          hasNext={hasNext && characters.length > 0}
          onLoadNext={() => loadNext(5)}
          isLoadingNext={isLoadingNext}
        />
      </GridWrap>
    </>
  )
}
