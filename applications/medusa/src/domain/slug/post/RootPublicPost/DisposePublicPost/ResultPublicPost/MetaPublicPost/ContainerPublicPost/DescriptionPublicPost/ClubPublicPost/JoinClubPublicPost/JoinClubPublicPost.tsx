import { graphql, useFragment } from 'react-relay/hooks'
import type { JoinClubPublicPostFragment$key } from '@//:artifacts/JoinClubPublicPostFragment.graphql'
import type { JoinClubPublicPostViewerFragment$key } from '@//:artifacts/JoinClubPublicPostViewerFragment.graphql'
import ClubJoinConditionWrapper
  from '../../../../../../../../../club/RootPublicClub/DisposePublicClub/ResultPublicClub/MetaPublicClub/ContainerPublicClub/HeaderPublicClub/components/ClubWrappers/ClubJoinConditionWrapper/ClubJoinConditionWrapper'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { PlusCircle } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import { Box } from '@chakra-ui/react'

interface Props {
  clubQuery: JoinClubPublicPostFragment$key
  viewerQuery: JoinClubPublicPostViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment JoinClubPublicPostFragment on Club {
    viewerMember {
      __typename
    }
    viewerIsOwner
    ...ClubJoinConditionWrapperFragment
  }
`

const ViewerFragment = graphql`
  fragment JoinClubPublicPostViewerFragment on Account {
    ...ClubJoinConditionWrapperViewerFragment
  }
`

export default function JoinClubPublicPost (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (clubData.viewerMember != null && !clubData.viewerIsOwner) {
    return <Box />
  }

  return (
    <ClubJoinConditionWrapper clubQuery={clubData} viewerQuery={viewerData}>
      {props => (
        <Button
          colorScheme='gray'
          size='md'
          borderRadius='xl'
          rightIcon={<Icon icon={PlusCircle} w={4} h={4} fill='gray.100' />}
          {...props}
        >
          <Trans>
            Join
          </Trans>
        </Button>
      )}
    </ClubJoinConditionWrapper>
  )
}
