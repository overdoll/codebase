import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { ResultSearchCharacterQuery as ResultSearchCharacterQueryType } from '@//:artifacts/ResultSearchCharacterQuery.graphql'
import ResultSearchCharacterQuery from '@//:artifacts/ResultSearchCharacterQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposeSearchCharacter from './DisposeSearchCharacter/DisposeSearchCharacter'

interface Props {
  queryRefs: {
    searchCharacterQuery: PreloadedQuery<ResultSearchCharacterQueryType>
  }
}

const RootSearchCharacter: PageProps<Props> = (props: Props) => {
  const { queryRefs: { searchCharacterQuery } } = props

  const params = useQueryLoader<ResultSearchCharacterQueryType>(
    ResultSearchCharacterQuery,
    searchCharacterQuery
  )

  return (
    <PageContainer>
      <DisposeSearchCharacter params={params} />
    </PageContainer>
  )
}

export default RootSearchCharacter
