import { PostSearchProps } from '../../constants'
import { decodeJson } from 'serialize-query-params'

export const filterOutDefault = (array): string[] => {
  return array.filter((item) => item != null && item !== '')
}

export default function decodeRouterArguments (query): PostSearchProps {
  const characters = decodeJson(query.get('characters'))
  const categories = query.getAll('categories')
  const series = query.getAll('series')
  const supporter = query.getAll('supporter')

  return {
    sortBy: query.get('sort') ?? 'TOP',
    categorySlugs: filterOutDefault(categories),
    seriesSlugs: filterOutDefault(series),
    characterSlugs: characters != null ? filterOutDefault(Object.keys(characters)) : null,
    supporterOnlyStatus: filterOutDefault(supporter)
  }
}
