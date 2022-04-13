import { Helmet } from 'react-helmet-async'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ChangeClubThumbnailQuery, {
  ChangeClubThumbnailQuery as ChangeClubThumbnailQueryType
} from '@//:artifacts/ChangeClubThumbnailQuery.graphql'
import { useParams } from '@//:modules/routing/useParams'
import ChangeClubThumbnail from './ChangeClubThumbnail/ChangeClubThumbnail'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  prepared: {
    query: PreloadedQuery<ChangeClubThumbnailQueryType>
  }
}

export default function RootChangeClubThumbnail (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ChangeClubThumbnailQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='club thumbnail' />
      <PageWrapper>
        <BackButton to={`/club/${match.slug as string}/settings`}>
          <Trans>
            Back to club settings
          </Trans>
        </BackButton>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            <Trans>
              Club Thumbnail
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            A square image is recommended for best fit across the platform.
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <ChangeClubThumbnail query={queryRef as PreloadedQuery<ChangeClubThumbnailQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
