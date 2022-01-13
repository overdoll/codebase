import type { JoinClubButtonClubFragment$key } from '@//:artifacts/JoinClubButtonClubFragment.graphql'
import type { JoinClubButtonViewerFragment$key } from '@//:artifacts/JoinClubButtonViewerFragment.graphql'

import { graphql } from 'react-relay'
import { useFragment, useMutation } from 'react-relay/hooks'
import { JoinClubButtonBecomeMemberMutation } from '@//:artifacts/JoinClubButtonBecomeMemberMutation.graphql'
import {
  JoinClubButtonWithdrawMembershipMutation
} from '@//:artifacts/JoinClubButtonWithdrawMembershipMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { Link } from '@//:modules/routing'
import { SafetyExitDoorLeft } from '@//:assets/icons/navigation'
import Icon from '../../../../../modules/content/Icon/Icon'
import { AddPlus, WarningTriangle } from '@//:assets/icons/interface'
import { useToast } from '@chakra-ui/react'

interface Props {
  clubQuery: JoinClubButtonClubFragment$key | null
  viewerQuery: JoinClubButtonViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment JoinClubButtonClubFragment on Club {
    id
    name
    viewerMember {
      __typename
    }
  }
`

const ViewerFragment = graphql`
  fragment JoinClubButtonViewerFragment on Account {
    clubMembershipsLimit
    clubMembershipsCount
  }
`

const JoinClubMutation = graphql`
  mutation JoinClubButtonBecomeMemberMutation($clubId: ID!) {
    becomeClubMember(input: {clubId: $clubId}) {
      clubMember {
        id
        club {
          id
          viewerMember {
            id
          }
        }
        account {
          id
        }
      }
    }
  }
`

const LeaveClubMutation = graphql`
  mutation JoinClubButtonWithdrawMembershipMutation($clubId: ID!) {
    withdrawClubMembership(input: {clubId: $clubId}) {
      clubMemberId
    }
  }
`

export default function JoinClubButton ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const [becomeMember, isBecomingMember] = useMutation<JoinClubButtonBecomeMemberMutation>(JoinClubMutation)

  const [withdrawMembership, isWithdrawingMembership] = useMutation<JoinClubButtonWithdrawMembershipMutation>(LeaveClubMutation)

  const isClubMember = clubData?.viewerMember !== null

  const canJoinClub = viewerData !== null ? viewerData.clubMembershipsCount < viewerData.clubMembershipsLimit : true

  const notify = useToast()

  const onJoinWhenLimited = (): void => {
    notify({
      status: 'error',
      title: t`You're in too many clubs. You need to leave at least one before you can join this one.`,
      isClosable: true
    })
  }

  const onBecomeMember = (): void => {
    if (clubData?.id == null) return

    becomeMember({
      variables: {
        clubId: clubData.id
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`You are now a member of ${clubData.name}!`,
          isClosable: true
        })
      },
      updater: (store, payload) => {
        const node = store.get(clubData.id)
        if (node != null) {
          node.setValue(node.getValue('membersCount') as number + 1, 'membersCount')
        }
      }
    })
  }

  const onWithdrawMembership = (): void => {
    if (clubData?.id == null) return

    withdrawMembership({
      variables: {
        clubId: clubData.id
      },
      updater: (store, payload) => {
        const node = store.get(clubData.id)
        if (node != null) {
          node.setValue(null, 'viewerMember')
          node.setValue(node.getValue('membersCount') as number - 1, 'membersCount')
        }
      }
    }
    )
  }

  if (clubData == null) {
    return <></>
  }

  if (viewerData == null) {
    return (
      <Link to='/join'>
        <Button
          size='lg'
          colorScheme='primary'
          leftIcon={
            <Icon
              icon={AddPlus}
              w={4}
              h={4}
              fill='primary.900'
            />
          }
        >
          <Trans>
            Join Club
          </Trans>
        </Button>
      </Link>
    )
  }

  if (isClubMember) {
    return (
      <Button
        leftIcon={
          <Icon
            icon={SafetyExitDoorLeft}
            w={4}
            h={4}
            fill='gray.100'
          />
        }
        onClick={onWithdrawMembership}
        isLoading={isWithdrawingMembership}
        size='lg'
        colorScheme='gray'
      >
        <Trans>
          Leave Club
        </Trans>
      </Button>
    )
  }

  if (canJoinClub) {
    return (
      <Button
        onClick={onBecomeMember}
        isLoading={isBecomingMember}
        size='lg'
        colorScheme='primary'
        leftIcon={<Icon
          icon={AddPlus}
          w={4}
          h={4}
          fill='primary.900'
                  />}
      >
        <Trans>
          Join Club
        </Trans>
      </Button>
    )
  }

  return (
    <Button
      leftIcon={
        <Icon
          icon={WarningTriangle}
          w={4}
          h={4}
          fill='primary.900'
        />
      }
      size='lg'
      colorScheme='primary'
      onClick={onJoinWhenLimited}
    >
      <Trans>
        Join Club
      </Trans>
    </Button>
  )
}
