import { PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import NameClubSettingsQuery, {
  NameClubSettingsQuery as NameClubSettingsQueryType
} from '@//:artifacts/NameClubSettingsQuery.graphql'
import NameClubSettings from './NameClubSettings/NameClubSettings'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    nameClubSettingsQuery: PreloadedQuery<NameClubSettingsQueryType>
  }
}

const RootNameClubSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    NameClubSettingsQuery,
    props.queryRefs.nameClubSettingsQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Club Name Settings - overdoll
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
          <PageSectionTitle colorScheme='green'>
            <Trans>
              Club Name
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <NameClubSettings query={queryRef as PreloadedQuery<NameClubSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootNameClubSettings
