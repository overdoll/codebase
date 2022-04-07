import { Helmet } from 'react-helmet-async'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ClubAliasesQuery, { ClubAliasesQuery as ClubAliasesQueryType } from '@//:artifacts/ClubAliasesQuery.graphql'
import { useParams } from '@//:modules/routing/useParams'
import ClubAliases from './ClubAliases/ClubAliases'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import { Trans } from '@lingui/macro'

interface Props {
  prepared: {
    query: PreloadedQuery<ClubAliasesQueryType>
  }
}

export default function RootClubAliases (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubAliasesQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet title='club aliases' />
      <PageWrapper>
        <BackButton to={`/club/${match.slug as string}/settings`}>
          <Trans>
            Back to club settings
          </Trans>
        </BackButton>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            <Trans>
              Club Link
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            You can have up to 5 different aliases for your club link so any old links don't break if you decide to
            change
            your club name.
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <ClubAliases query={queryRef as PreloadedQuery<ClubAliasesQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
