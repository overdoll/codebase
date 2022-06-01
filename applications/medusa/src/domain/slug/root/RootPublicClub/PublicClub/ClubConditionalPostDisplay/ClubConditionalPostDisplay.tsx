import { graphql, useFragment } from 'react-relay/hooks'
import { ClubConditionalPostDisplayFragment$key } from '@//:artifacts/ClubConditionalPostDisplayFragment.graphql'
import {
  ClubConditionalPostDisplayViewerFragment$key
} from '@//:artifacts/ClubConditionalPostDisplayViewerFragment.graphql'
import { Heading, Stack } from '@chakra-ui/react'
import SupportClubButton from './SupportClubButton/SupportClubButton'
import ClubExclusivePosts from './ClubExclusivePosts/ClubExclusivePosts'
import ClubTopPosts from './ClubTopPosts/ClubTopPosts'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'

interface Props {
  clubQuery: ClubConditionalPostDisplayFragment$key
  viewerQuery: ClubConditionalPostDisplayViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubConditionalPostDisplayFragment on Club {
    posts(first: 1) {
      edges {
        node {
          __typename
        }
      }
    }
    ...SupportClubButtonClubFragment
    ...ClubExclusivePostsFragment
    ...ClubTopPostsFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubConditionalPostDisplayViewerFragment on Account {
    ...SupportClubButtonViewerFragment
  }
`

export default function ClubConditionalPostDisplay ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (clubData.posts.edges.length < 1) {
    return (
      <LargeBackgroundBox>
        <Heading textAlign='center' color='gray.200' fontSize='lg'>
          <Trans>
            This club hasn't posted any content yet
          </Trans>
        </Heading>
      </LargeBackgroundBox>
    )
  }

  return (
    <>
      <Stack spacing={2}>
        <SupportClubButton clubQuery={clubData} viewerQuery={viewerData} />
        <ClubExclusivePosts query={clubData} />
      </Stack>
      <ClubTopPosts query={clubData} />
    </>
  )
}