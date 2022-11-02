import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ResultBrowseCharactersQuery, {
  ResultBrowseCharactersQuery as ResultBrowseCharactersQueryType
} from '@//:artifacts/ResultBrowseCharactersQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeBrowseCharacters from './DisposeBrowseCharacters/DisposeBrowseCharacters'

interface Props {
  queryRefs: {
    browseCharactersQuery: PreloadedQuery<ResultBrowseCharactersQueryType>
  }
}

const RootBrowseCharacters: PageProps<Props> = (props: Props) => {
  const { queryRefs: { browseCharactersQuery } } = props

  const params = useQueryLoader<ResultBrowseCharactersQueryType>(
    ResultBrowseCharactersQuery,
    browseCharactersQuery
  )

  return (
    <PageContainer>
      <DisposeBrowseCharacters params={params} />
    </PageContainer>
  )
}

export default RootBrowseCharacters
