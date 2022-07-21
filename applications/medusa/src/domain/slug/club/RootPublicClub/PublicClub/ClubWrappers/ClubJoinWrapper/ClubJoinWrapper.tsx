import type { ClubJoinWrapperFragment$key } from '@//:artifacts/ClubJoinWrapperFragment.graphql'
import type { ClubJoinWrapperViewerFragment$key } from '@//:artifacts/ClubJoinWrapperViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment, useMutation } from 'react-relay/hooks'
import { ClubJoinWrapperMutation } from '@//:artifacts/ClubJoinWrapperMutation.graphql'
import { t } from '@lingui/macro'
import { useToast } from '@//:modules/content/ThemeComponents'
import { MaybeRenderProp } from '@//:types/components'
import runIfFunction from '@//:modules/support/runIfFunction'

interface ChildrenCallable {
  joinClub: () => void
  canJoinClub: boolean
  isJoiningClub: boolean
}

interface Props {
  clubQuery: ClubJoinWrapperFragment$key
  viewerQuery: ClubJoinWrapperViewerFragment$key | null
  children: MaybeRenderProp<ChildrenCallable>
}

const ClubFragment = graphql`
  fragment ClubJoinWrapperFragment on Club {
    id
    name
  }
`

const ViewerFragment = graphql`
  fragment ClubJoinWrapperViewerFragment on Account {
    clubMembershipsLimit
    clubMembershipsCount
  }
`

const Mutation = graphql`
  mutation ClubJoinWrapperMutation($input: JoinClubInput!) {
    joinClub(input: $input) {
      clubMember {
        id
        club {
          id
        }
        account {
          id
        }
        joinedAt
      }
    }
  }
`

export default function ClubJoinWrapper ({
  clubQuery,
  viewerQuery,
  children
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const [joinClub, isJoiningClub] = useMutation<ClubJoinWrapperMutation>(Mutation)

  const canJoinClub = viewerData !== null ? viewerData.clubMembershipsCount < viewerData.clubMembershipsLimit : true

  const notify = useToast()

  const onJoinClub = (): void => {
    if (clubData?.id == null) return

    joinClub({
      variables: {
        input: {
          clubId: clubData.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`You are now a member of ${clubData.name}!`
        })
      },
      updater: (store) => {
        const node = store.get(clubData.id)
        const payload = store.getRootField('joinClub').getLinkedRecord('clubMember')
        if (node != null) {
          node.setValue(node.getValue('membersCount') as number + 1, 'membersCount')
          if (payload != null) {
            node.setLinkedRecord(payload, 'viewerMember')
          }
        }
      }
    })
  }

  return (
    <>
      {runIfFunction(children, {
        joinClub: onJoinClub,
        canJoinClub: canJoinClub,
        isJoiningClub: isJoiningClub
      })}
    </>
  )
}
