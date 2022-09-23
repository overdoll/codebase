import { graphql, useFragment } from 'react-relay/hooks'
import type { BannerCreatePostFragment$key } from '@//:artifacts/BannerCreatePostFragment.graphql'
import type { BannerCreatePostClubFragment$key } from '@//:artifacts/BannerCreatePostClubFragment.graphql'
import useAbility from '@//:modules/authorization/useAbility'
import ClubInformationBanner from '@//:common/components/ClubInformationBanner/ClubInformationBanner'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import { Trans } from '@lingui/macro'

interface Props {
  postQuery: BannerCreatePostFragment$key | null
  clubQuery: BannerCreatePostClubFragment$key
}

const PostFragment = graphql`
  fragment BannerCreatePostFragment on Post {
    state
  }
`

const ClubFragment = graphql`
  fragment BannerCreatePostClubFragment on Club {
    ...ClubInformationBannerFragment
  }
`

export default function BannerCreatePost ({
  postQuery,
  clubQuery
}: Props): JSX.Element {
  const postData = useFragment(PostFragment, postQuery)
  const clubData = useFragment(ClubFragment, clubQuery)

  const ability = useAbility()

  return (
    <>
      <ClubInformationBanner query={clubData} />
      {(ability.can('staff', 'Post') && postData?.state !== 'DRAFT' && postData != null) && (
        <Alert
          status='info'
          mb={2}
        >
          <AlertIcon />
          <AlertDescription>
            <Trans>
              You are editing this post as a staff member
            </Trans>
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}
