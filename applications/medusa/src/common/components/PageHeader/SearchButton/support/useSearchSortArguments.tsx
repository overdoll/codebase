import { useQueryParams } from 'use-query-params'
import { useUpdateEffect } from 'usehooks-ts'
import { configMap } from '../constants'
import { useRouter } from 'next/router'

export default function useSearchSortArguments (onChange: (params) => void): void {
  const [query] = useQueryParams(configMap)

  const {
    query: {
      seriesSlug,
      characterSlug,
      categorySlug
    }
  } = useRouter()

  const entitySearch = {
    ...(seriesSlug != null && { seriesSlug }),
    ...(characterSlug != null && { characterSlug }),
    ...(categorySlug != null && { categorySlug })
  }

  useUpdateEffect(() => {
    onChange({
      sortBy: query.sort == null ? 'ALGORITHM' : query.sort,
      ...(query?.supporter != null && query.supporter.length > 0 && { supporterOnlyStatus: query.supporter }),
      ...entitySearch
    })
  }, [query])
}
