import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { ResultBrowseQuery as ResultBrowseQueryType } from '@//:artifacts/ResultBrowseQuery.graphql'
import ResultBrowseQuery from '@//:artifacts/ResultBrowseQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeBrowse from './DisposeBrowse/DisposeBrowse'

interface Props {
  queryRefs: {
    browseQuery: PreloadedQuery<ResultBrowseQueryType>
  }
}

const RootBrowse: PageProps<Props> = (props: Props): JSX.Element => {
  const { queryRefs: { browseQuery } } = props

  const params = useQueryLoader(
    ResultBrowseQuery,
    browseQuery
  )

  return (
    <PageContainer>
      <DisposeBrowse params={params} />
    </PageContainer>
  )
}

export default RootBrowse
