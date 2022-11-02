import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ResultBrowseCategoriesQuery, {
  ResultBrowseCategoriesQuery as ResultBrowseCategoriesQueryType
} from '@//:artifacts/ResultBrowseCategoriesQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeBrowseCategories from './DisposeBrowseCategories/DisposeBrowseCategories'

interface Props {
  queryRefs: {
    browseCategoriesQuery: PreloadedQuery<ResultBrowseCategoriesQueryType>
  }
}

const RootBrowseCategories: PageProps<Props> = (props: Props) => {
  const { queryRefs: { browseCategoriesQuery } } = props

  const params = useQueryLoader<ResultBrowseCategoriesQueryType>(
    ResultBrowseCategoriesQuery,
    browseCategoriesQuery
  )

  return (
    <PageContainer>
      <DisposeBrowseCategories params={params} />
    </PageContainer>
  )
}

export default RootBrowseCategories
