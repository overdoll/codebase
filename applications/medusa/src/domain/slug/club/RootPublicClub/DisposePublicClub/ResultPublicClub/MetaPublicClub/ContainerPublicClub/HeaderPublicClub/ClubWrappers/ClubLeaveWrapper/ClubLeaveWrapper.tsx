import type { ClubLeaveWrapperClubFragment$key } from '@//:artifacts/ClubLeaveWrapperClubFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment, useMutation } from 'react-relay/hooks'
import { ClubLeaveWrapperMutation } from '@//:artifacts/ClubLeaveWrapperMutation.graphql'
import runIfFunction from '@//:modules/support/runIfFunction'
import { MaybeRenderProp } from '@//:types/components'

interface ChildrenCallable {
  leaveClub: () => void
  isLeavingClub: boolean
}

interface Props {
  clubQuery: ClubLeaveWrapperClubFragment$key
  children: MaybeRenderProp<ChildrenCallable>
}

const ClubFragment = graphql`
  fragment ClubLeaveWrapperClubFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation ClubLeaveWrapperMutation($clubId: ID!) {
    leaveClub(input: {clubId: $clubId}) {
      clubMemberId
    }
  }
`

export default function ClubLeaveWrapper ({
  clubQuery,
  children
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const [leaveClub, isLeavingClub] = useMutation<ClubLeaveWrapperMutation>(Mutation)

  const onLeaveClub = (): void => {
    if (clubData?.id == null) return

    leaveClub({
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

  return (
    <>
      {runIfFunction(children, {
        leaveClub: onLeaveClub,
        isLeavingClub: isLeavingClub
      })}
    </>
  )
}
