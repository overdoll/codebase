/**
 * @flow
 */
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type SearchCharactersQuery from '@//:artifacts/SearchCharactersQuery.graphql'
import { usePaginationFragment } from 'react-relay'
import type { SearchCharactersFragment$key } from '@//:artifacts/SearchCharactersFragment.graphql'
import { useTranslation } from 'react-i18next'
import { removeNode } from '@//:modules/utilities/functions'
import { Flex, Text, Wrap, WrapItem } from '@chakra-ui/react'
import {
  LargeGridItem,
  GridWrap,
  Selector,
  SelectorTextOverlay
} from '../../../../../../../../../../../../components/ContentSelection'
import ResourceItem from '../../../../../../../../../../../../../modules/content/DataDisplay/ResourceItem/ResourceItem'
import Button from '@//:modules/form/Button'

type Props = {
  selected: Array<string>,
  onSelect: () => void,
  queryArgs: () => void,
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
            type
            urls {
              mimeType
              url
            }
          }
        }
      }
    }
  }
`

export default function SearchCategories ({ onSelect, selected, queryArgs }: Props): Node {
  const queryData = useLazyLoadQuery<SearchCharactersQuery>(
    SearchCharactersQueryGQL,
    queryArgs.variables,
    queryArgs.options
  )

  const { data, loadNext, isLoadingNext, hasNext } = usePaginationFragment<SearchCharactersFragment$key>(
    SearchCharactersFragmentGQL,
    queryData
  )

  const [t] = useTranslation('manage')

  const characters = removeNode(data.characters.edges)

  const onChangeSelection = (id) => {
    const character = characters.filter((item) => item.id === id)[0]
    onSelect(character)
  }

  // If no categories were found, show empty placeholder
  if (characters.length < 1) {
    return (
      <Flex px={4} py={4} bg='gray.800' borderRadius='md' h={100} justify='center' align='center'>
        <Text color='gray.200' textAlign='center' fontSize='lg'>
          {t('posts.flow.steps.character.selector.search.empty', { word: queryArgs.variables.name })}
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
              onSelect={onChangeSelection} selected={selected} id={item.id}
            >
              <SelectorTextOverlay label={item.name} description={item.series.title}>
                <ResourceItem
                  type={item.thumbnail.type}
                  urls={item.thumbnail.urls}
                />
              </SelectorTextOverlay>
            </Selector>
          </LargeGridItem>
        )
        )}
        {hasNext &&
          <LargeGridItem height='inherit'>
            <Button w='100%' h='100%' variant='panel' onClick={() => loadNext(5)} isLoading={isLoadingNext}>
              <Flex
                align='center'
                justify='center'
                whiteSpace='normal'
              >
                <Text color='gray.00'>
                  {t('posts.flow.steps.character.selector.search.load')}
                </Text>
              </Flex>
            </Button>
          </LargeGridItem>}
      </GridWrap>
    </>
  )
}
