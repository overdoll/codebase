import { useQueryParams } from 'use-query-params'
import { useUpdateEffect } from 'usehooks-ts'
import { configMap } from '../../constants'
import { filterOutDefault } from '../decodeRouterArguments'

export default function useGeneralSearchArguments (onChange: (params) => void): void {
  const [query] = useQueryParams(configMap)

  useUpdateEffect(() => {
    onChange({
      categorySlugs: query.categories == null ? [] : filterOutDefault(query.categories),
      seriesSlugs: query.series == null ? [] : filterOutDefault(query.series),
      characterSlugs: query.characters == null ? [] : filterOutDefault(Object.keys(query.characters)),
      sortBy: query.sort == null ? 'TOP' : query.sort,
      supporterOnlyStatus: query?.supporter != null && query.supporter.length > 0 ? query.supporter : null
    })
  }, [query])
}
