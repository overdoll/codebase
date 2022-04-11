import { ArrayParam, ObjectParam, StringParam } from 'serialize-query-params'

export const configMap = {
  categories: ArrayParam,
  characters: ObjectParam,
  series: ArrayParam,
  sort: StringParam,
  supporter: ArrayParam
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
  supporterOnlyStatus?: string[] | null
  sortBy: string
}
