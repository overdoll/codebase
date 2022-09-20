import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubJoinConditionWrapperFragment$key } from '@//:artifacts/ClubJoinConditionWrapperFragment.graphql'
import type {
  ClubJoinConditionWrapperViewerFragment$key
} from '@//:artifacts/ClubJoinConditionWrapperViewerFragment.graphql'
import ClubOwnerJoinWrapper from '../ClubOwnerJoinWrapper/ClubOwnerJoinWrapper'
import ClubJoinWrapper from '@//:modules/content/Wrappers/ClubJoinWrapper/ClubJoinWrapper'
import { MaybeRenderProp } from '@//:types/components'
import runIfFunction from '@//:modules/support/runIfFunction'
import Can from '@//:modules/authorization/Can'
import ClubGuestJoinWrapper from '../ClubGuestJoinWrapper/ClubGuestJoinWrapper'

interface ChildrenCallable {
  onClick: () => void
  isDisabled: boolean
  isLoading: boolean
}

interface Props {
  clubQuery: ClubJoinConditionWrapperFragment$key
  viewerQuery: ClubJoinConditionWrapperViewerFragment$key | null
  children: MaybeRenderProp<ChildrenCallable>
}

const ClubFragment = graphql`
  fragment ClubJoinConditionWrapperFragment on Club {
    viewerIsOwner
    ...ClubJoinWrapperFragment
    ...ClubGuestJoinWrapperFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubJoinConditionWrapperViewerFragment on Account {
    ...ClubJoinWrapperViewerFragment
  }
`

export default function ClubJoinConditionWrapper ({
  clubQuery,
  viewerQuery,
  children
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (viewerData == null) {
    return (
      <ClubGuestJoinWrapper query={clubData}>
        {({
          joinClub
        }) => (
          <>
            {runIfFunction(children, {
              onClick: joinClub,
              isDisabled: false,
              isLoading: false
            })}
          </>
        )}
      </ClubGuestJoinWrapper>
    )
  }

  if (clubData.viewerIsOwner) {
    return (
      <ClubOwnerJoinWrapper>
        {runIfFunction(children, {
          onClick: () => {
          },
          isDisabled: false,
          isLoading: false
        })}
      </ClubOwnerJoinWrapper>
    )
  }

  return (
    <Can I='interact' a='Club' passThrough>
      {allowed => (
        <ClubJoinWrapper clubQuery={clubData} viewerQuery={viewerData}>
          {({
            joinClub,
            canJoinClub,
            isJoiningClub
          }) => (
            <>
              {runIfFunction(children, {
                onClick: joinClub,
                isDisabled: allowed === false ? true : !canJoinClub,
                isLoading: isJoiningClub
              })}
            </>
          )}
        </ClubJoinWrapper>
      )}
    </Can>
  )
}
