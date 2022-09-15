import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { ResultSearchCategoryQuery as ResultSearchCategoryQueryType } from '@//:artifacts/ResultSearchCategoryQuery.graphql'
import ResultSearchCategoryQuery from '@//:artifacts/ResultSearchCategoryQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeSearchCategory from './DisposeSearchCategory/DisposeSearchCategory'

interface Props {
  queryRefs: {
    searchCategoryQuery: PreloadedQuery<ResultSearchCategoryQueryType>
  }
}

const RootSearchCategory: PageProps<Props> = (props: Props) => {
  const { queryRefs: { searchCategoryQuery } } = props

  const params = useQueryLoader<ResultSearchCategoryQueryType>(
    ResultSearchCategoryQuery,
    searchCategoryQuery
  )

  return (
    <PageContainer>
      <DisposeSearchCategory params={params} />
    </PageContainer>
  )
}

export default RootSearchCategory
