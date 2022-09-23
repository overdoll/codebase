import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  ResultPublicClubCharacterQuery as ResultPublicClubCharacterQueryType
} from '@//:artifacts/ResultPublicClubCharacterQuery.graphql'
import ResultPublicClubCharacterQuery from '@//:artifacts/ResultPublicClubCharacterQuery.graphql'
import { PageProps } from '@//:types/app'
import { PageContainer } from '@//:modules/content/PageLayout'
import DisposePublicClubCharacter from './DisposePublicClubCharacter/DisposePublicClubCharacter'

interface Props {
  queryRefs: {
    publicClubCharacterQuery: PreloadedQuery<ResultPublicClubCharacterQueryType>
  }
}

const RootPublicClubCharacter: PageProps<Props> = (props: Props) => {
  const { queryRefs: { publicClubCharacterQuery } } = props

  const params = useQueryLoader<ResultPublicClubCharacterQueryType>(
    ResultPublicClubCharacterQuery,
    publicClubCharacterQuery
  )

  return (
    <PageContainer>
      <DisposePublicClubCharacter params={params} />
    </PageContainer>
  )
}

export default RootPublicClubCharacter
