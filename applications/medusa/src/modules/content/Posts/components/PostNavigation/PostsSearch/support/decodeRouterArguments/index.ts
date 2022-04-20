import { PostSearchProps } from '../../constants'
import { decodeObject } from 'serialize-query-params'

export const filterOutDefault = (array): string[] => {
  if (typeof array === 'string') return [array]
  return array.filter((item) => item != null && item !== '')
}

export default function decodeRouterArguments (query): PostSearchProps {
  const characters = decodeObject(query?.characters)
  const categories = query?.categories
  const series = query?.series
  const supporter = query?.supporter

  return {
    sortBy: query?.sort ?? 'TOP',
    categorySlugs: categories != null ? filterOutDefault(categories) : [],
    seriesSlugs: series != null ? filterOutDefault(series) : [],
    characterSlugs: characters != null ? filterOutDefault(Object.keys(characters)) : [],
    supporterOnlyStatus: supporter != null ? filterOutDefault(supporter) : []
  }
}
