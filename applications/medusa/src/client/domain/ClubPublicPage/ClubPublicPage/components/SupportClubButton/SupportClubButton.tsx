import type { SupportClubButtonClubFragment$key } from '@//:artifacts/SupportClubButtonClubFragment.graphql'
import type { SupportClubButtonViewerFragment$key } from '@//:artifacts/SupportClubButtonViewerFragment.graphql'

import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { ButtonProps } from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'

interface Props extends ButtonProps {
  clubQuery: SupportClubButtonClubFragment$key
  viewerQuery: SupportClubButtonViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment SupportClubButtonClubFragment on Club {
    viewerMember {
      isSupporter
    }
    supporterSubscriptionPrice {
      localizedPrice {
        amount
        currency
      }
    }
  }
`

const ViewerFragment = graphql`
  fragment SupportClubButtonViewerFragment on Account {
    __typename
  }
`

export default function SupportClubButton ({
  clubQuery,
  viewerQuery,
  ...rest
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  console.log(clubData)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  if (clubData.viewerMember?.isSupporter === true) {
    return (
      <Button
        colorScheme='gray'
        size='lg'
        {...rest}
      >
        <Trans>
          Manage Subscriptions
        </Trans>
      </Button>
    )
  }

  if (viewerData == null) {
    return (
      <LinkButton
        colorScheme='orange'
        size='lg'
        to='/join'
        {...rest}
      >
        <Trans>
          Become a Supporter
        </Trans>
      </LinkButton>
    )
  }

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
