import { PageSectionDescription, PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import AliasesClubSettingsQuery, {
  AliasesClubSettingsQuery as AliasesClubSettingsQueryType
} from '@//:artifacts/AliasesClubSettingsQuery.graphql'
import AliasesClubSettings from './AliasesClubSettings/AliasesClubSettings'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import { Trans } from '@lingui/macro'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'

interface Props {
  queryRefs: {
    aliasesClubSettingsQuery: PreloadedQuery<AliasesClubSettingsQueryType>
  }
}

const RootAliasesClubSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    AliasesClubSettingsQuery,
    props.queryRefs.aliasesClubSettingsQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Aliases - Club Settings :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <BackButton href={{
          pathname: '/club/[slug]/settings',
          query: { slug: slug as string }
        }}
        >
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
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <AliasesClubSettings query={queryRef as PreloadedQuery<AliasesClubSettingsQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootAliasesClubSettings
