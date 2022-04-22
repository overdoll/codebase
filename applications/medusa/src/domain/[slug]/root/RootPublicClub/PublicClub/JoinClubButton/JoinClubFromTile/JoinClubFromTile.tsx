import type { JoinClubFromTileFragment$key } from '@//:artifacts/JoinClubFromTileFragment.graphql'
import type { JoinClubFromTileViewerFragment$key } from '@//:artifacts/JoinClubFromTileViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { ButtonProps } from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { PremiumStar } from '@//:assets/icons'
import BecomeMemberButton from '../BecomeMemberButton/BecomeMemberButton'
import Button from '@//:modules/form/Button/Button'
import encodeJoinRedirect from '@//:modules/support/encodeJoinRedirect'

interface Props extends ButtonProps {
  clubQuery: JoinClubFromTileFragment$key
  viewerQuery: JoinClubFromTileViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment JoinClubFromTileFragment on Club {
    ...BecomeMemberButtonClubFragment
    ...WithdrawMembershipButtonClubFragment
    viewerMember {
      isSupporter
    }
    slug
  }
`

const ViewerFragment = graphql`
  fragment JoinClubFromTileViewerFragment on Account {
    ...BecomeMemberButtonViewerFragment
  }
`

export default function JoinClubFromTile ({
  clubQuery,
  viewerQuery,
  ...rest
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const isClubMember = clubData?.viewerMember !== null
  const isClubSupporter = clubData?.viewerMember?.isSupporter === true

  const redirect = encodeJoinRedirect({
    pathname: '/[slug]',
    query: {
      slug: clubData.slug
    }
  })

  if (viewerData == null) {
    return (
      <LinkButton
        href={redirect}
        colorScheme='primary'
        {...rest}
      >
        <Trans>
          Join
        </Trans>
      </LinkButton>
    )
  }

  if (isClubSupporter) {
    return (
      <Button
        colorScheme='gray'
        isDisabled
        leftIcon={(
          <Icon
            icon={PremiumStar}
            fill='gray.100'
            h={3}
            w={3}
          />)}
        {...rest}
      >
        <Trans>
          Supporter
        </Trans>
      </Button>
    )
  }

  if (isClubMember) {
    return (
      <LinkButton
        href={`/${clubData.slug}?support=true`}
        leftIcon={(
          <Icon
            icon={PremiumStar}
            fill='orange.900'
            h={4}
            w={4}
          />)}
        colorScheme='orange'
        {...rest}
      >
        <Trans>
          Support
        </Trans>
      </LinkButton>
    )
  }

  return (
    <BecomeMemberButton
      clubQuery={clubData}
      viewerQuery={viewerData}
      {...rest}
    />
  )
}
