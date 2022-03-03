import { ArrayParam, JsonParam, StringParam } from 'serialize-query-params'

export const configMap = {
  categories: ArrayParam,
  characters: JsonParam,
  series: ArrayParam,
  sort: StringParam
}

export interface GeneralSearchProps {
  search?: string | null
  first?: number
  seriesSlugs?: string[] | null
  categoriesSlugs?: string[] | null
  charactersSlugs?: string[] | null
  charactersSeriesSlug?: string | null
}

export interface PostSearchProps {
  seriesSlugs?: string[] | null
  categorySlugs?: string[] | null
  characterSlugs?: string[] | null
  sortBy: string
}