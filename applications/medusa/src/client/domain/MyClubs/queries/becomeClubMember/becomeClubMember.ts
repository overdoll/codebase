import { graphql, useMutation } from 'react-relay/hooks'
import type { becomeClubMemberMutation } from '@//:artifacts/becomeClubMemberMutation.graphql'

const Mutation = graphql`
  mutation becomeClubMemberMutation($clubId: ID!) {
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

export default function becomeClubMember (clubId: string): [() => void, boolean] {
  const [becomeMember, isBecomingMember] = useMutation<becomeClubMemberMutation>(Mutation)

  const onBecomeMember = (): void => {
    becomeMember({
      variables: {
        clubId: clubId
      },
      onCompleted () {

      },
      onError () {

      }
    })
  }

  return [onBecomeMember, isBecomingMember]
}
