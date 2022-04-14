import { PostSearchProps } from '../../constants'
import { decodeObject } from 'serialize-query-params'

export const filterOutDefault = (array): string[] => {
  return array.filter((item) => item != null && item !== '')
}

export default function decodeRouterArguments (query): PostSearchProps {
  const characters = decodeObject(query.characters)
  const categories = query.categories
  const series = query.series
  const supporter = query.supporter

  return {
    sortBy: query.sort ?? 'TOP',
    categorySlugs: filterOutDefault(categories),
    seriesSlugs: filterOutDefault(series),
    characterSlugs: characters != null ? filterOutDefault(Object.keys(characters)) : [],
    supporterOnlyStatus: filterOutDefault(supporter)
  }
}
