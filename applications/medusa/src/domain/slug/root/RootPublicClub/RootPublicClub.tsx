import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import { PageWrapper } from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import React, { Suspense } from 'react'
import PublicClubQuery, { PublicClubQuery as PublicClubQueryType } from '@//:artifacts/PublicClubQuery.graphql'
import PublicClub from './PublicClub/PublicClub'
import SkeletonPost from '@//:modules/content/Placeholder/Loading/SkeletonPost/SkeletonPost'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'
import RootPublicClubRichObject
  from '../../../../common/rich-objects/slug/RootPublicClubRichObject/RootPublicClubRichObject'

interface Props {
  queryRefs: {
    publicClubQuery: PreloadedQuery<PublicClubQueryType>
  }
}

const RootPublicClub: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    PublicClubQuery,
    props.queryRefs.publicClubQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <RootPublicClubRichObject />
      <PageWrapper>
        <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
          <Suspense fallback={<SkeletonPost />}>
            <PublicClub query={queryRef as PreloadedQuery<PublicClubQueryType>} />
          </Suspense>
        </QueryErrorBoundary>
      </PageWrapper>
    </>
  )
}

export default RootPublicClub
