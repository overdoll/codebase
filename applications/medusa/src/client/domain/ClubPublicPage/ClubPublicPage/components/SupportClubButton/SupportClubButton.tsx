import type { SupportClubButtonClubFragment$key } from '@//:artifacts/SupportClubButtonClubFragment.graphql'
import type { SupportClubButtonViewerFragment$key } from '@//:artifacts/SupportClubButtonViewerFragment.graphql'

import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { ButtonProps } from '@chakra-ui/react'

interface Props extends ButtonProps {
  clubQuery: SupportClubButtonClubFragment$key
  viewerQuery: SupportClubButtonViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment SupportClubButtonClubFragment on Club {
    id
    name
  }
`

const ViewerFragment = graphql`
  fragment SupportClubButtonViewerFragment on Account {
    clubMembershipsLimit
    clubMembershipsCount
  }
`

export default function SupportClubButton ({
  clubQuery,
  viewerQuery,
  ...rest
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  return (
    <>
      <Button
        colorScheme='orange'
        size='lg'
        {...rest}
      >
        <Trans>
          Become a Supporter
        </Trans>
      </Button>
    </>
  )
}
