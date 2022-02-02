import { QueryArguments } from '@//:types/hooks'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { GeneralSearchQuery } from '@//:artifacts/GeneralSearchQuery.graphql'
import SearchCategoriesGeneral from './SearchCategoriesGeneral/SearchCategoriesGeneral'
import { StateProps } from '../../FloatingGeneralSearchButton'
import { addKeyToObject, removeKeyFromObject } from '@//:modules/support'
import { filterObjectByKeyValue } from '../../helpers/filterObjectByKeyValue'
import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import SearchCharactersGeneral from './SearchCharactersGeneral/SearchCharactersGeneral'
import SearchSeriesGeneral from './SearchSeriesGeneral/SearchSeriesGeneral'
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
    $categoriesSlugs: [String!],
    $charactersSeriesSlug: String
  ){
    ...SearchCategoriesGeneralFragment
    ...SearchCharactersGeneralFragment
    ...SearchSeriesGeneralFragment
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

  const [searchSeriesCount, setSearchSeriesCount] = useState([])
  const [searchCharactersCount, setSearchCharactersCount] = useState([])
  const [searchCategoriesCount, setSearchCategoriesCount] = useState([])

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
    setSearchSeriesCount(data.series.edges)
  }

  const onCharactersChange = (data): void => {
    setSearchCharactersCount(data.characters.edges)
  }

  const onCategoriesChange = (data): void => {
    setSearchCategoriesCount(data.categories.edges)
  }

  const emptyResults = searchSeriesCount.length < 1 && searchCharactersCount.length < 1 && searchCategoriesCount.length < 1

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
          <SearchSeriesGeneral
            onDataChange={onSeriesChange}
            selected={Object.keys(series)}
            onSelect={onSelectSeries}
            query={queryData}
          />
          <SearchCharactersGeneral
            onDataChange={onCharactersChange}
            selected={Object.keys(characters)}
            onSelect={onSelectCharacter}
            query={queryData}
          />
          <SearchCategoriesGeneral
            onDataChange={onCategoriesChange}
            selected={Object.keys(categories)}
            onSelect={onSelectCategory}
            query={queryData}
          />
        </Stack>
      </Box>
      <Box px={2}>
        <TagManager
          searchValues={searchValues}
          setSearchValues={setSearchValues}
        />
      </Box>
    </Stack>
  )
}
