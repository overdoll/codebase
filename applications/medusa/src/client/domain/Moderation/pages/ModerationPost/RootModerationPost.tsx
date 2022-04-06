import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageSectionTitle, PageSectionWrap, PageWrapper } from '@//:modules/content/PageLayout'
import type { PreloadedQuery } from 'react-relay/hooks'
import { useQueryLoader } from 'react-relay/hooks'
import type { ModerationPostQuery as ModerationPostQueryType } from '@//:artifacts/ModerationPostQuery.graphql'
import ModerationPostQuery from '@//:artifacts/ModerationPostQuery.graphql'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { useParams } from '@//:modules/routing/useParams'

import { SkeletonStack } from '@//:modules/content/Placeholder'
import { Trans } from '@lingui/macro'
import ModerationPost from './ModerationPost/ModerationPost'

interface Props {
  prepared: {
    query: PreloadedQuery<ModerationPostQueryType>
  }
}

export default function RootModerationPost (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader<ModerationPostQueryType>(
    ModerationPostQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <>
      <Helmet>
        <title>
          Post - Moderation :: overdoll.com
        </title>
      </Helmet>
      <PageWrapper>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='purple'>
            <Trans>
              Moderate Post
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <QueryErrorBoundary loadQuery={() => loadQuery({ reference: match.reference as string })}>
          <Suspense fallback={<SkeletonStack />}>
            <ModerationPost query={queryRef as PreloadedQuery<ModerationPostQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}
