import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { SearchChoicesQuery } from '@//:artifacts/SearchChoicesQuery.graphql'
import { Stack } from '@chakra-ui/react'
import { useSearchContext } from '../../../../../../../../HookedComponents/Search'
import { ChoiceProvider, ChoiceRemovableTags, useChoice } from '../../../../../../../../HookedComponents/Choice'
import GeneralSearchCategories from './GeneralSearchCategories/GeneralSearchCategories'
import GeneralSearchCharacters from './GeneralSearchCharacters/GeneralSearchCharacters'
import GeneralSearchSeries from './GeneralSearchSeries/GeneralSearchSeries'
import SaveGeneralSearchButton from './SaveGeneralSearchButton/SaveGeneralSearchButton'
import { EmptyGeneralSearch } from '../../../../../../../../Placeholder'
import { useQueryParams } from 'use-query-params'
import { configMap } from '../../../../constants'

interface Props {
  routeTo: string
  onClose: () => void
}

interface ChoiceProps {
  slug: string
  type: string
  tagTitle: string
  title?: string
  name?: string
  series?: {
    slug: string
  }
}

const Query = graphql`
  query SearchChoicesQuery(
    $search: String,
    $seriesSlugs: [String!],
    $charactersSlugs: [String!],
    $categoriesSlugs: [String!],
    $charactersSeriesSlug: String
  ){
    ...GeneralSearchCategoriesFragment
    ...GeneralSearchCharactersFragment
    ...GeneralSearchSeriesFragment
    categories (
      first: 5,
      title: $search,
      slugs: $categoriesSlugs
    ) {
      edges {
        node {
          id
          slug
          title
        }
      }
    }
    characters (
      first: 5,
      name: $search,
      slugs: $charactersSlugs
      seriesSlug: $charactersSeriesSlug
    ) {
      edges {
        node {
          id
          slug
          name
          series {
            slug
          }
        }
      }
    }
    series (
      first: 5,
      title: $search,
      slugs: $seriesSlugs
    ) {
      edges {
        node {
          id
          slug
          title
        }
      }
    }
  }
`

export default function SearchChoices ({
  routeTo,
  onClose
}: Props): JSX.Element {
  const { searchArguments } = useSearchContext()

  const queryData = useLazyLoadQuery<SearchChoicesQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const [query] = useQueryParams(configMap)

  const categories = query.categories != null
    ? queryData.categories.edges.reduce((accum, item) => ({
      ...accum,
      [item.node.id]: {
        title: item.node.title,
        slug: item.node.slug,
        tagTitle: item.node.title,
        type: 'category'
      }
    }), {})
    : {}

  const characters = query.characters != null
    ? queryData.characters.edges.reduce((accum, item) => ({
      ...accum,
      [item.node.id]: {
        name: item.node.name,
        slug: item.node.slug,
        series: {
          slug: item.node.series.slug
        },
        tagTitle: item.node.name,
        type: 'character'
      }
    }), {})
    : {}

  const series = query.series != null
    ? queryData.series.edges.reduce((accum, item) => ({
      ...accum,
      [item.node.id]: {
        title: item.node.title,
        slug: item.node.slug,
        tagTitle: item.node.title,
        type: 'series'
      }
    }), {})
    : {}

  const defaultChoice = {
    ...categories,
    ...characters,
    ...series
  }

  const choiceMethods = useChoice<ChoiceProps>({
    defaultValue: defaultChoice
  })

  const {
    values,
    removeValue
  } = choiceMethods

  const isEmpty = queryData.categories.edges.length < 1 && queryData.characters.edges.length < 1 && queryData.series.edges.length < 1

  return (
    <ChoiceProvider {...choiceMethods}>
      <Stack spacing={2}>
        <SaveGeneralSearchButton onClose={onClose} routeTo={routeTo} />
        <ChoiceRemovableTags values={values} removeValue={removeValue} titleKey='tagTitle' />
        {isEmpty && <EmptyGeneralSearch hint={searchArguments.variables.search} />}
        <GeneralSearchCategories query={queryData} />
        <GeneralSearchCharacters query={queryData} />
        <GeneralSearchSeries query={queryData} />
      </Stack>
    </ChoiceProvider>
  )
}
