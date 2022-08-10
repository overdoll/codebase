import { Suspense } from 'react'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  PublicClubCharacterQuery as PublicClubCharacterQueryType
} from '@//:artifacts/PublicClubCharacterQuery.graphql'
import PublicClubCharacterQuery from '@//:artifacts/PublicClubCharacterQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'
import PublicClubCharacter from './PublicClubCharacter/PublicClubCharacter'
import useSearchSortArguments
  from '../../../../common/components/PageHeader/SearchButton/support/useSearchSortArguments'
import { PageWrapper } from '@//:modules/content/PageLayout'

interface Props {
  queryRefs: {
    publicClubCharacterQuery: PreloadedQuery<PublicClubCharacterQueryType>
  }
}

const RootPublicClubCharacter: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader<PublicClubCharacterQueryType>(
    PublicClubCharacterQuery,
    props.queryRefs.publicClubCharacterQuery
  )

  const {
    query: {
      slug,
      characterSlug
    }
  } = useRouter()

  useSearchSortArguments((params) => loadQuery(params))

  return (
    <>
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({
          clubSlug: slug as string,
          characterSlug: characterSlug as string,
          sortBy: 'TOP'
        })}
        >
          <Suspense fallback={<SkeletonStack />}>
            <PublicClubCharacter query={queryRef as PreloadedQuery<PublicClubCharacterQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootPublicClubCharacter
