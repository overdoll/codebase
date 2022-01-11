import { graphql, useMutation } from 'react-relay/hooks'
import type { withdrawClubMembershipMutation } from '@//:artifacts/withdrawClubMembershipMutation.graphql'

const Mutation = graphql`
  mutation withdrawClubMembershipMutation($clubId: ID!) {
    withdrawClubMembership(input: {clubId: $clubId}) {
      clubMemberId
    }
  }
`

export default function withdrawClubMembership (clubId: string): [() => void, boolean] {
  const [withdrawMembership, isWithdrawingMembership] = useMutation<withdrawClubMembershipMutation>(Mutation)

  const onWithdrawMembership = (): void => {
    withdrawMembership({
      variables: {
        clubId: clubId
      },
      onCompleted () {

      },
      onError () {

      }
    })
  }

  return [onWithdrawMembership, isWithdrawingMembership]
}
