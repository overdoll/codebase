import type { BecomeMemberButtonClubFragment$key } from '@//:artifacts/BecomeMemberButtonClubFragment.graphql'
import type { BecomeMemberButtonViewerFragment$key } from '@//:artifacts/BecomeMemberButtonViewerFragment.graphql'

import { graphql } from 'react-relay'
import { useFragment, useMutation } from 'react-relay/hooks'
import { BecomeMemberButtonMutation } from '@//:artifacts/BecomeMemberButtonMutation.graphql'
import Button from '@//:modules/form/Button/Button'
import { t, Trans } from '@lingui/macro'
import { useToast } from '@//:modules/content/ThemeComponents'
import { useContext } from 'react'
import { AbilityContext } from '@//:modules/authorization/AbilityContext'
import { ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {
  clubQuery: BecomeMemberButtonClubFragment$key
  viewerQuery: BecomeMemberButtonViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment BecomeMemberButtonClubFragment on Club {
    id
    name
  }
`

const ViewerFragment = graphql`
  fragment BecomeMemberButtonViewerFragment on Account {
    clubMembershipsLimit
    clubMembershipsCount
  }
`

const JoinClubMutation = graphql`
  mutation BecomeMemberButtonMutation($clubId: ID!) {
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

export default function BecomeMemberButton ({
  clubQuery,
  viewerQuery,
  ...rest
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const [becomeMember, isBecomingMember] = useMutation<BecomeMemberButtonMutation>(JoinClubMutation)

  const canJoinClub = viewerData !== null ? viewerData.clubMembershipsCount < viewerData.clubMembershipsLimit : true

  const notify = useToast()

  const ability = useContext(AbilityContext)

  const isDisabled = ability.cannot('interact', 'Club')

  const onJoinWhenLimited = (): void => {
    notify({
      status: 'error',
      title: t`You're in too many clubs. You need to leave at least one before you can join this one.`
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
          title: t`You are now a member of ${clubData.name}!`
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

  if (canJoinClub) {
    return (
      <Button
        isDisabled={isDisabled}
        onClick={onBecomeMember}
        isLoading={isBecomingMember}
        colorScheme='primary'
        {...rest}
      >
        <Trans>
          Join
        </Trans>
      </Button>
    )
  }

  return (
    <Button
      isDisabled={isDisabled}
      colorScheme='primary'
      onClick={onJoinWhenLimited}
      {...rest}
    >
      <Trans>
        Join
      </Trans>
    </Button>
  )
}
