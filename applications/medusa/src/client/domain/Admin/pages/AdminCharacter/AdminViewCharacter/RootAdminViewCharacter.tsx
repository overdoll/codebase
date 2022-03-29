import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type {
  AdminViewCharacterQuery as AdminViewCharacterQueryType
} from '@//:artifacts/AdminViewCharacterQuery.graphql'
import AdminViewCharacterQuery from '@//:artifacts/AdminViewCharacterQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { Stack } from '@chakra-ui/react'
import AdminViewCharacter from './AdminViewCharacter/AdminViewCharacter'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import AdminBackButton from '../../../components/AdminBackButton/AdminBackButton'
import { Trans } from '@lingui/macro'
import BackButton from '../../../../../../modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminViewCharacterQueryType>
  }
}

export default function RootAdminViewCharacter (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    AdminViewCharacterQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='view character' />
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton to='/admin/character/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({
            slug: match.slug as string,
            seriesSlug: match.seriesSlug as string
          })}
          >
            <Suspense fallback={<SkeletonStack />}>
              <AdminViewCharacter query={queryRef as PreloadedQuery<AdminViewCharacterQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
