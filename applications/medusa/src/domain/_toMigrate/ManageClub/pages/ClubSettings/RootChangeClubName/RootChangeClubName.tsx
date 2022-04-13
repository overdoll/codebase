import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ChangeClubNameQuery, {
  ChangeClubNameQuery as ChangeClubNameQueryType
} from '@//:artifacts/ChangeClubNameQuery.graphql'
import { useParams } from '@//:modules/routing/useParams'
import ChangeClubName from './ChangeClubName/ChangeClubName'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  prepared: {
    query: PreloadedQuery<ChangeClubNameQueryType>
  }
}

export default function RootChangeClubThumbnail (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ChangeClubNameQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='club name' />
      <PageWrapper>
        <BackButton to={`/club/${match.slug as string}/settings`}>
          <Trans>
            Back to club settings
          </Trans>
        </BackButton>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='green'>
            <Trans>
              Club Name
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <ChangeClubName query={queryRef as PreloadedQuery<ChangeClubNameQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
