import { QueryArguments } from '@//:types/hooks'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { GeneralSearchQuery } from '@//:artifacts/GeneralSearchQuery.graphql'
import SearchCategoriesSelector from './SearchCategoriesSelector/SearchCategoriesSelector'
import { StateProps } from '../../FloatingGeneralSearchButton'
import { addKeyToObject } from '../../helpers/addKeyToObject'
import { removeKeyFromObject } from '../../helpers/removeKeyFromObject'
import { filterObjectByKeyValue } from '../../helpers/filterObjectByKeyValue'
import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import SearchCharactersSelector from './SearchCharactersSelector/SearchCharactersSelector'
import SearchSeriesSelector from './SearchSeriesSelector/SearchSeriesSelector'
import { useState } from 'react'
import { Trans } from '@lingui/macro'
import TagManager from './TagManager/TagManager'

interface Props extends StateProps {
  queryArguments: QueryArguments
}

const Query = graphql`
  query GeneralSearchQuery(
    $search: String,
    $first: Int,
    $seriesSlugs: [String!],
    $charactersSlugs: [String!],
    $categoriesSlugs: [String!]
  ){
    ...SearchCategoriesSelectorFragment
    ...SearchCharactersSelectorFragment
    ...SearchSeriesSelectorFragment
    ...TagManagerFragment
  }
`

export default function GeneralSearch ({
  queryArguments,
  searchValues,
  setSearchValues
}: Props): JSX.Element {
  const queryData = useLazyLoadQuery<GeneralSearchQuery>(
    Query,
    queryArguments.variables,
    queryArguments.options
  )

  const [searchSeriesCount, setSearchSeriesCount] = useState(0)
  const [searchCharactersCount, setSearchCharactersCount] = useState(0)
  const [searchCategoriesCount, setSearchCategoriesCount] = useState(0)

  const categories = filterObjectByKeyValue('type', 'category', searchValues)
  const characters = filterObjectByKeyValue('type', 'character', searchValues)
  const series = filterObjectByKeyValue('type', 'serial', searchValues)

  const onSelect = (item, type, take): void => {
    if (searchValues[item.id] != null) {
      setSearchValues(prev => removeKeyFromObject(item.id, prev))
      return
    }
    setSearchValues(prev => addKeyToObject({
      [item.id]: {
        type: type,
        ...(Object.keys(take).reduce((accum, val) => ({
          ...accum,
          [take[val]]: item[val]
        }), {}))
      }
    }, prev))
  }

  const onSelectCharacter = (character): void => {
    onSelect(character, 'character', {
      name: 'title',
      slug: 'slug'
    })
  }

  const onSelectCategory = (category): void => {
    onSelect(category, 'category', {
      title: 'title',
      slug: 'slug'
    })
  }

  const onSelectSeries = (serial): void => {
    onSelect(serial, 'serial', {
      title: 'title',
      slug: 'slug'
    })
  }

  const onSeriesChange = (data): void => {
    setSearchSeriesCount(data.series.edges.length)
  }

  const onCharactersChange = (data): void => {
    setSearchCharactersCount(data.characters.edges.length)
  }

  const onCategoriesChange = (data): void => {
    setSearchCategoriesCount(data.categories.edges.length)
  }

  const emptyResults = searchSeriesCount < 1 && searchCharactersCount < 1 && searchCategoriesCount < 1

  return (
    <Stack spacing={2}>
      <Box p={2} bg='gray.800'>
        <Stack spacing={2}>
          {emptyResults &&
            <Flex h={200} align='center' justify='center'>
              <Heading color='gray.00' fontSize='lg'>
                <Trans>Nothing was found</Trans>
              </Heading>
            </Flex>}
          <SearchSeriesSelector
            showEmptyPlaceholder={false}
            onDataChange={onSeriesChange}
            selected={Object.keys(series)}
            onSelect={onSelectSeries}
            query={queryData}
          />
          <SearchCharactersSelector
            showEmptyPlaceholder={false}
            onDataChange={onCharactersChange}
            selected={Object.keys(characters)}
            onSelect={onSelectCharacter}
            query={queryData}
          />
          <SearchCategoriesSelector
            showEmptyPlaceholder={false}
            onDataChange={onCategoriesChange}
            selected={Object.keys(categories)}
            onSelect={onSelectCategory}
            query={queryData}
          />

        </Stack>
      </Box>
      <Box px={2}>
        <TagManager
          query={queryData}
          searchValues={searchValues}
          setSearchValues={setSearchValues}
        />
      </Box>
    </Stack>
  )
}
