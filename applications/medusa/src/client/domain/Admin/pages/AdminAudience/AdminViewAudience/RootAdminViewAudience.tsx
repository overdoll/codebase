import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { AdminViewAudienceQuery as AdminViewAudienceQueryType } from '@//:artifacts/AdminViewAudienceQuery.graphql'
import AdminViewAudienceQuery from '@//:artifacts/ClubPostsQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { Stack } from '@chakra-ui/react'
import AdminViewAudience from './AdminViewAudience/AdminViewAudience'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import BackButton from '../../../../../../modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminViewAudienceQueryType>
  }
}

export default function RootAdminViewAudience (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    AdminViewAudienceQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='view category' />
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton to='/admin/audience/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
            <Suspense fallback={<SkeletonStack />}>
              <AdminViewAudience query={queryRef as PreloadedQuery<AdminViewAudienceQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
