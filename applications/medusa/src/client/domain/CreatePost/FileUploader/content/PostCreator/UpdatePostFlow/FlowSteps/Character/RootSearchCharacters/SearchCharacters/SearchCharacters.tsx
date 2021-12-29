import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { SearchCharactersQuery } from '@//:artifacts/SearchCharactersQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import { removeNode } from '@//:modules/support'
import { Flex, Text } from '@chakra-ui/react'
import {
  GridWrap,
  LargeGridItem,
  Selector,
  SelectorTextOverlay
} from '../../../../../../../../../../components/ContentSelection'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import { ClickableBox } from '@//:modules/content/PageLayout'
import type { QueryArgs as QueryArgsType } from '@//:types/upload'
import { Trans } from '@lingui/macro'

interface Props {
  selected: string[]
  onSelect: (character) => void
  queryArgs: QueryArgsType
}

const SearchCharactersQueryGQL = graphql`
  query SearchCharactersQuery($name: String) {
    ...SearchCharactersFragment @arguments(name: $name)
  }
`

const SearchCharactersFragmentGQL = graphql`
  fragment SearchCharactersFragment on Query
  @argumentDefinitions(
    first: {type: Int, defaultValue: 3}
    after: {type: String},
    name: {type: String}
  )
  @refetchable(queryName: "SearchCharactersPaginationFragment" )
  {
    characters (
      first: $first,
      after: $after,
      name: $name
    ) @connection(key: "SearchCharacters_characters")
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

export default function SearchCategories ({
  onSelect,
  selected,
  queryArgs
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<SearchCharactersQuery>(
    SearchCharactersQueryGQL,
    queryArgs.variables,
    queryArgs.options
  )

  const {
    data,
    loadNext,
    isLoadingNext,
    hasNext
  } = usePaginationFragment<SearchCharactersQuery, any>(
    SearchCharactersFragmentGQL,
    queryData
  )

  const characters = removeNode(data.characters.edges)

  const onChangeSelection = (id): void => {
    const character = characters.filter((item) => item.id === id)[0]
    onSelect(character)
  }

  // If no categories were found, show empty placeholder
  if (characters.length < 1) {
    return (
      <Flex px={4} py={4} bg='gray.800' borderRadius='md' h={100} justify='center' align='center'>
        <Text color='gray.200' textAlign='center' fontSize='lg'>
          <Trans>
            No characters were found with the name {queryArgs.variables.name}
          </Trans>
        </Text>
      </Flex>
    )
  }

  return (
    <>
      <GridWrap justify='center'>
        {characters.map((item, index) => (
          <LargeGridItem key={index}>
            <Selector
              onSelect={onChangeSelection}
              selected={selected}
              id={item.id}
            >
              <SelectorTextOverlay label={item.name} description={item.series.title}>
                <ResourceItem
                  query={item.thumbnail}
                />
              </SelectorTextOverlay>
            </Selector>
          </LargeGridItem>
        )
        )}
        {hasNext &&
          <LargeGridItem height='inherit'>
            <ClickableBox
              w='100%'
              h='100%'
              onClick={() => loadNext(5)}
              isLoading={isLoadingNext}
              whiteSpace='normal'
              align='center'
              justify='center'
            >
              <Text textAlign='center' color='gray.00'>
                <Trans>
                  Load More Characters
                </Trans>
              </Text>
            </ClickableBox>
          </LargeGridItem>}
      </GridWrap>
    </>
  )
}
