import { Suspense } from 'react'
import { PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { ClubPayoutQuery as ClubPayoutQueryType } from '@//:artifacts/ClubPayoutQuery.graphql'
import ClubPayoutQuery from '@//:artifacts/ClubPayoutQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { PageProps } from '@//:types/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ClubPayout from './ClubPayout/ClubPayout'
import { Trans } from '@lingui/macro'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'
import { SkeletonStack } from '@//:modules/content/Placeholder'

interface Props {
  queryRefs: {
    clubPayoutQuery: PreloadedQuery<ClubPayoutQueryType>
  }
}

const RootClubPayout: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubPayoutQuery,
    props.queryRefs.clubPayoutQuery
  )

  const {
    query: {
      reference,
      slug
    }
  } = useRouter()

  return (
    <>
      <Head>
        <title>
          Payout Information - overdoll
        </title>
      </Head>
      <PageWrapper>
        <BackButton href={{
          pathname: '/club/[slug]/revenue',
          query: { slug: slug as string }
        }}
        >
          <Trans>
            Back to Revenue
          </Trans>
        </BackButton>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: reference as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <ClubPayout query={queryRef as PreloadedQuery<ClubPayoutQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootClubPayout
