import type { JoinClubButtonClubFragment$key } from '@//:artifacts/JoinClubButtonClubFragment.graphql'
import type { JoinClubButtonViewerFragment$key } from '@//:artifacts/JoinClubButtonViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import WithdrawMembershipButton from './WithdrawMembershipButton/WithdrawMembershipButton'
import BecomeMemberButton from './BecomeMemberButton/BecomeMemberButton'
import { ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {
  clubQuery: JoinClubButtonClubFragment$key
  viewerQuery: JoinClubButtonViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment JoinClubButtonClubFragment on Club {
    ...BecomeMemberButtonClubFragment
    ...WithdrawMembershipButtonClubFragment
    viewerMember {
      isSupporter
    }
  }
`

const ViewerFragment = graphql`
  fragment JoinClubButtonViewerFragment on Account {
    ...BecomeMemberButtonViewerFragment
  }
`

export default function JoinClubButton ({
  clubQuery,
  viewerQuery,
  ...rest
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const isClubMember = clubData?.viewerMember !== null

  if (viewerData == null) {
    return (
      <LinkButton
        to='/join'
        colorScheme='primary'
        {...rest}
      >
        <Trans>
          Join
        </Trans>
      </LinkButton>
    )
  }

  if (isClubMember) {
    return (
      <WithdrawMembershipButton
        isDisabled={clubData?.viewerMember.isSupporter}
        clubQuery={clubData}
        {...rest}
      />
    )
  }

  return (
    <BecomeMemberButton
      clubQuery={clubData}
      viewerQuery={viewerData}
      {...rest}
    />
  )
}
