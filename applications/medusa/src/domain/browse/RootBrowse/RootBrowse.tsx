import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { BrowseQuery as BrowseQueryType } from '@//:artifacts/BrowseQuery.graphql'
import BrowseQuery from '@//:artifacts/BrowseQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeBrowse from './DisposeBrowse/DisposeBrowse'

interface Props {
  queryRefs: {
    browseQuery: PreloadedQuery<BrowseQueryType>
  }
}

const RootBrowse: PageProps<Props> = (props: Props): JSX.Element => {
  const { queryRefs: { browseQuery } } = props

  const params = useQueryLoader(
    BrowseQuery,
    browseQuery
  )

  return (
    <PageContainer>
      <DisposeBrowse params={params} />
    </PageContainer>
  )
}

export default RootBrowse
