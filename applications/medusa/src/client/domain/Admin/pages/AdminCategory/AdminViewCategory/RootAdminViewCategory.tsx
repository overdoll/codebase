import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { AdminViewCategoryQuery as AdminViewCategoryQueryType } from '@//:artifacts/AdminViewCategoryQuery.graphql'
import AdminViewCategoryQuery from '@//:artifacts/ClubPostsQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'
import { Stack } from '@chakra-ui/react'
import AdminViewCategory from './AdminViewCategory/AdminViewCategory'
import { SkeletonStack } from '@//:modules/content/Placeholder'
import AdminBackButton from '../../../components/AdminBackButton/AdminBackButton'
import BackButton from '../../../../../../modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import { Trans } from '@lingui/macro'

interface Props {
  prepared: {
    query: PreloadedQuery<AdminViewCategoryQueryType>
  }
}

export default function RootAdminViewCategory (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    AdminViewCategoryQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='view category' />
      <PageWrapper>
        <Stack spacing={2}>
          <BackButton to='/admin/category/search'>
            <Trans>
              Back to search
            </Trans>
          </BackButton>
          <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
            <Suspense fallback={<SkeletonStack />}>
              <AdminViewCategory query={queryRef as PreloadedQuery<AdminViewCategoryQueryType>} />
            </Suspense>
          </QueryErrorBoundary>
        </Stack>
      </PageWrapper>
    </>
  )
}
