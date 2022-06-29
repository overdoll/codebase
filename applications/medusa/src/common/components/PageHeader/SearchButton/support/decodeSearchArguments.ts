import { SearchProps } from '../constants'

export const filterOutDefault = (array): string[] => {
  if (typeof array === 'string') return [array]
  return array.filter((item) => item != null && item !== '')
}

export default function decodeSearchArguments (query): SearchProps {
  const supporter = query?.supporter

  return {
    sortBy: query?.sort ?? 'TOP',
    supporterOnlyStatus: supporter != null ? filterOutDefault(supporter) : []
  }
}
