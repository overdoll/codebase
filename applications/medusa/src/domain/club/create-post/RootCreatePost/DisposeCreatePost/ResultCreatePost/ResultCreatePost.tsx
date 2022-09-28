import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ResultCreatePostQuery } from '@//:artifacts/ResultCreatePostQuery.graphql'
import { graphql } from 'react-relay'
import MetaCreatePost from './MetaCreatePost/MetaCreatePost'
import EmptyClubCreatePost from './EmptyClubCreatePost/EmptyClubCreatePost'
import RestrictedClubCreatePost from './RestrictedClubCreatePost/RestrictedClubCreatePost'
import { MobileContainer } from '@//:modules/content/PageLayout'
import SubmittedCreatePost from './MetaCreatePost/ContainerCreatePost/SubmittedCreatePost/SubmittedCreatePost'

interface Props {
  query: PreloadedQuery<ResultCreatePostQuery>
}

const Query = graphql`
  query ResultCreatePostQuery ($reference: String!, $slug: String!) {
    post (reference: $reference) {
      state
      ...MetaCreatePostFragment
    }
    club (slug: $slug) {
      __typename

      suspension {
        __typename
      }
      termination {
        __typename
      }
      viewerIsOwner
      ...RestrictedClubCreatePostFragment
      ...MetaCreatePostClubFragment
    }
    viewer {
      isStaff
      isWorker
    }
  }
`

export default function ResultCreatePost (props: Props): JSX.Element {
  const { query } = props

  const queryData = usePreloadedQuery<ResultCreatePostQuery>(
    Query,
    query
  )

  if (queryData.club == null) {
    return <EmptyClubCreatePost />
  }

  if (!queryData?.club?.viewerIsOwner && ((queryData.viewer?.isStaff) === false) && !(queryData.viewer?.isWorker)) {
    return <EmptyClubCreatePost />
  }

  if ((queryData.club?.suspension != null || queryData.club?.termination != null)) {
    return <RestrictedClubCreatePost query={queryData?.club} />
  }

  // If the post was already submitted
  if (queryData.post?.state !== 'DRAFT' && ((queryData.viewer?.isStaff) === false) && !(queryData.viewer?.isWorker)) {
    return (
      <MobileContainer pt={2}>
        <SubmittedCreatePost />
      </MobileContainer>
    )
  }

  return (
    <MetaCreatePost postQuery={queryData?.post} clubQuery={queryData.club} />
  )
}
