import { PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import BlurbClubSettingsQuery, {
  BlurbClubSettingsQuery as BlurbClubSettingsQueryType
} from '@//:artifacts/BlurbClubSettingsQuery.graphql'
import BlurbClubSettings from './BlurbClubSettings/BlurbClubSettings'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    blurbClubSettingsQuery: PreloadedQuery<BlurbClubSettingsQueryType>
  }
}

const RootBlurbClubSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    BlurbClubSettingsQuery,
    props.queryRefs.blurbClubSettingsQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Club Blurb Settings - overdoll
        </title>
      </Head>
      <PageWrapper>
        <BackButton href={{
          pathname: '/club/[slug]/settings',
          query: { slug: slug as string }
        }}
        >
          <Trans>
            Back to Club Settings
          </Trans>
        </BackButton>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Club Blurb
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <BlurbClubSettings query={queryRef as PreloadedQuery<BlurbClubSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootBlurbClubSettings
