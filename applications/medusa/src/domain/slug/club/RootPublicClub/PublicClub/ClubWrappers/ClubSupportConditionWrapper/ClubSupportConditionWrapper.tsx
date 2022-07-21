import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubSupportConditionWrapperFragment$key } from '@//:artifacts/ClubSupportConditionWrapperFragment.graphql'
import type {
  ClubSupportConditionWrapperViewerFragment$key
} from '@//:artifacts/ClubSupportConditionWrapperViewerFragment.graphql'
import { MaybeRenderProp } from '@//:types/components'
import runIfFunction from '@//:modules/support/runIfFunction'
import Can from '@//:modules/authorization/Can'
import ClubSupportWrapper from '../ClubSupportWrapper/ClubSupportWrapper'
import ClubOwnerSupportWrapper from '../ClubOwnerSupportWrapper/ClubOwnerSupportWrapper'
import ClubGuestSupportWrapper from '../ClubGuestSupportWrapper/ClubGuestSupportWrapper'
import ClubRedirectSupportWrapper from '../ClubRedirectSupportWrapper/ClubRedirectSupportWrapper'

interface ChildrenCallable {
  onClick: () => void
  isDisabled: boolean
  isLoading: boolean
}

interface Props {
  clubQuery: ClubSupportConditionWrapperFragment$key
  viewerQuery: ClubSupportConditionWrapperViewerFragment$key | null
  children: MaybeRenderProp<ChildrenCallable>
  redirectSupport?: boolean
}

const ClubFragment = graphql`
  fragment ClubSupportConditionWrapperFragment on Club {
    viewerIsOwner
    ...ClubGuestJoinWrapperFragment
    ...ClubGuestSupportWrapperFragment
    ...ClubSupportWrapperFragment
    ...ClubRedirectSupportWrapperFragment
  }
`

const ViewerFragment = graphql`
  fragment ClubSupportConditionWrapperViewerFragment on Account {
    ...ClubSupportWrapperViewerFragment
  }
`

export default function ClubSupportConditionWrapper ({
  clubQuery,
  viewerQuery,
  children,
  redirectSupport = false
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
    if (redirectSupport) {
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
      <ClubOwnerSupportWrapper>
        {runIfFunction(children, {
          onClick: () => {
          },
          isDisabled: false,
          isLoading: false
        })}
      </ClubOwnerSupportWrapper>
    )
  }

  return (
    <Can I='interact' a='Club' passThrough>
      {allowed => {
        if (redirectSupport) {
          return (
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
          )
        }
        return (
          <ClubSupportWrapper clubQuery={clubData} viewerQuery={viewerData}>
            {({
              onSupport,
              canSupport
            }) => (
              <>
                {runIfFunction(children, {
                  onClick: onSupport,
                  isDisabled: allowed === false ? true : !canSupport,
                  isLoading: false
                })}
              </>
            )}
          </ClubSupportWrapper>
        )
      }}
    </Can>
  )
}
