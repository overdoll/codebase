import { useQueryParam } from 'use-query-params'
import { PostsSort } from '@//:artifacts/SearchQuery.graphql'
import { useUpdateEffect } from 'usehooks-ts'

interface Props {
  queryLoader: (variables) => void
  extraParams: {
    [param: string]: any
  }
}

export default function useSearchButtonQueryArguments ({
  queryLoader,
  extraParams
}: Props): () => void {
  const [series] = useQueryParam<string[] | null | undefined>('series')
  const [categories] = useQueryParam<string[] | null | undefined>('categories')
  const [characters] = useQueryParam<string[] | null | undefined>('characters')
  const [sort] = useQueryParam<string | null | undefined>('sort')

  const loadQueryWithParams = (): void => {
    queryLoader({
      sortBy: sort != null ? sort as PostsSort : 'TOP',
      categorySlugs: categories,
      seriesSlugs: series,
      characterSlugs: characters,
      ...extraParams
    })
  }

  useUpdateEffect(() => {
    if (series == null && categories == null && characters == null && sort == null) return
    loadQueryWithParams()
  }, [series, categories, characters, sort])

  return loadQueryWithParams
}
