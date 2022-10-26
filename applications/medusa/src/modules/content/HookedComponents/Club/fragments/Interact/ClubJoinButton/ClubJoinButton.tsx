import { ClubJoinButtonFragment$key } from '@//:artifacts/ClubJoinButtonFragment.graphql'
import { ClubJoinButtonViewerFragment$key } from '@//:artifacts/ClubJoinButtonViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment, useMutation } from 'react-relay/hooks'
import { ClubJoinButtonMutation } from '@//:artifacts/ClubJoinButtonMutation.graphql'
import { useToast } from '../../../../../ThemeComponents'
import { t } from '@lingui/macro'
import posthog from 'posthog-js'
import MediumGenericButton from '@//:common/components/GenericButtons/MediumGenericButton/MediumGenericButton'
import { useLingui } from '@lingui/react'
import Can from '../../../../../../authorization/Can'

interface Props {
  clubQuery: ClubJoinButtonFragment$key
  viewerQuery: ClubJoinButtonViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment ClubJoinButtonFragment on Club {
    id
    name
    slug
  }
`

const ViewerFragment = graphql`
  fragment ClubJoinButtonViewerFragment on Account {
    clubMembershipsLimit
    clubMembershipsCount
  }
`

const Mutation = graphql`
  mutation ClubJoinButtonMutation($input: JoinClubInput!) {
    joinClub(input: $input) {
      clubMember {
        id
        club {
          id
          viewerMember {
            __typename
          }
        }
        account {
          id
        }
        joinedAt
      }
    }
  }
`

export default function ClubJoinButton (props: Props): JSX.Element {
  const {
    clubQuery,
    viewerQuery
  } = props

  const clubData = useFragment(ClubFragment, clubQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const [joinClub, isJoiningClub] = useMutation<ClubJoinButtonMutation>(Mutation)

  const canJoinClub = viewerData !== null ? viewerData.clubMembershipsCount < viewerData.clubMembershipsLimit : true

  const { i18n } = useLingui()

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
        posthog?.capture('joined-club', {
          club: clubData.slug
        })
      },
      updater: (store) => {
        const node = store.get(clubData.id)
        const payload = store.getRootField('joinClub').getLinkedRecord('clubMember')
        const accountNode = store.getRoot().getLinkedRecord('viewer')
        if (accountNode != null) {
          accountNode.setValue(accountNode.getValue('clubMembershipsCount') as number + 1, 'clubMembershipsCount')
        }
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
    <Can I='interact' a='Club' passThrough>
      {allowed => (
        <MediumGenericButton
          isDisabled={!canJoinClub || allowed === false}
          isLoading={isJoiningClub}
          colorScheme='white'
          onClick={onJoinClub}
        >
          {i18n._(t`Join`)}
        </MediumGenericButton>
      )}
    </Can>
  )
}
