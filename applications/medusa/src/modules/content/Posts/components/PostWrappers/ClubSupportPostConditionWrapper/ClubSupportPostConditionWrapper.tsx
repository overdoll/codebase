import { graphql, useFragment } from 'react-relay/hooks'
import type {
  ClubSupportPostConditionWrapperFragment$key
} from '@//:artifacts/ClubSupportPostConditionWrapperFragment.graphql'
import type {
  ClubSupportPostConditionWrapperViewerFragment$key
} from '@//:artifacts/ClubSupportPostConditionWrapperViewerFragment.graphql'
import { MaybeRenderProp } from '@//:types/components'
import runIfFunction from '../../../../../support/runIfFunction'
import Can from '../../../../../authorization/Can'
import ClubGuestSupportWrapper
  from '@//:domain/slug/club/RootPublicClub/DisposePublicClub/ResultPublicClub/MetaPublicClub/ContainerPublicClub/HeaderPublicClub/ClubWrappers/ClubGuestSupportWrapper/ClubGuestSupportWrapper'
import ClubRedirectSupportWrapper
  from '@//:domain/slug/club/RootPublicClub/DisposePublicClub/ResultPublicClub/MetaPublicClub/ContainerPublicClub/HeaderPublicClub/ClubWrappers/ClubRedirectSupportWrapper/ClubRedirectSupportWrapper'

interface ChildrenCallable {
  onClick: () => void
  isDisabled: boolean
  isLoading: boolean
}

interface Props {
  clubQuery: ClubSupportPostConditionWrapperFragment$key
  viewerQuery: ClubSupportPostConditionWrapperViewerFragment$key | null
  children: MaybeRenderProp<ChildrenCallable>
}

const ClubFragment = graphql`
  fragment ClubSupportPostConditionWrapperFragment on Club {
    viewerIsOwner
    ...ClubGuestJoinWrapperFragment
    ...ClubGuestSupportWrapperFragment
    ...ClubRedirectSupportWrapperFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubSupportPostConditionWrapperViewerFragment on Account {
    __typename
  }
`

export default function ClubSupportPostConditionWrapper ({
  clubQuery,
  viewerQuery,
  children
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (viewerData == null) {
    return (
      <ClubGuestSupportWrapper query={clubData}>
        {({
          supportClub
        }) => (
          <>
            {runIfFunction(children, {
              onClick: supportClub,
              isDisabled: false,
              isLoading: false
            })}
          </>
        )}
      </ClubGuestSupportWrapper>
    )
  }

  if (clubData.viewerIsOwner) {
    return (
      <ClubRedirectSupportWrapper query={clubData}>
        {({
          supportClub
        }) => (
          <>
            {runIfFunction(children, {
              onClick: supportClub,
              isDisabled: false,
              isLoading: false
            })}
          </>
        )}
      </ClubRedirectSupportWrapper>
    )
  }

  return (
    <Can I='interact' a='Club' passThrough>
      {allowed => (
        <ClubRedirectSupportWrapper query={clubData}>
          {({
            supportClub
          }) => (
            <>
              {runIfFunction(children, {
                onClick: supportClub,
                isDisabled: allowed === false,
                isLoading: false
              })}
            </>
          )}
        </ClubRedirectSupportWrapper>
      )}
    </Can>
  )
}
