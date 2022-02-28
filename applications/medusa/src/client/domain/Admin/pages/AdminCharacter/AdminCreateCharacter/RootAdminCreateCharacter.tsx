import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import AdminCreateCharacterQuery, {
  AdminCreateCharacterQuery as AdminCreateCharacterQueryType
} from '@//:artifacts/AdminCreateCharacterQuery.graphql'
import AdminCreateCharacter from './AdminCreateCharacter/AdminCreateCharacter'
import { Trans } from '@lingui/macro'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminCreateCharacterQueryType>
  }
}

export default function RootAdminCreateCharacter (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    AdminCreateCharacterQuery,
    props.prepared.query
  )

  return (
    <>
      <Helmet title='create character' />
      <PageWrapper>
        <PageSectionTitle>
          <Trans>
            Create Character
          </Trans>
        </PageSectionTitle>
        <QueryErrorBoundary loadQuery={() => loadQuery({})}>
          <Suspense fallback={<SkeletonStack />}>
            <AdminCreateCharacter
              query={queryRef as PreloadedQuery<AdminCreateCharacterQueryType>}
            />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
