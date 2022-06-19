import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ThumbnailClubSettingsQuery, {
  ThumbnailClubSettingsQuery as ThumbnailClubSettingsQueryType
} from '@//:artifacts/ThumbnailClubSettingsQuery.graphql'
import ThumbnailClubSettings from './ThumbnailClubSettings/ThumbnailClubSettings'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    thumbnailClubSettingsQuery: PreloadedQuery<ThumbnailClubSettingsQueryType>
  }
}

const RootThumbnailClubSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    ThumbnailClubSettingsQuery,
    props.queryRefs.thumbnailClubSettingsQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Club Thumbnail Settings - overdoll
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
          <PageSectionTitle colorScheme='teal'>
            <Trans>
              Club Thumbnail
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            A square image is recommended for best fit across the platform.
          </PageSectionDescription>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <ThumbnailClubSettings query={queryRef as PreloadedQuery<ThumbnailClubSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootThumbnailClubSettings
