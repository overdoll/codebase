import type { JoinClubFromPostFragment$key } from '@//:artifacts/JoinClubFromPostFragment.graphql'
import type { JoinClubFromPostViewerFragment$key } from '@//:artifacts/JoinClubFromPostViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { ButtonProps, HStack } from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { PremiumStar, RemoveCross } from '@//:assets/icons'
import BecomeMemberButton from '../BecomeMemberButton/BecomeMemberButton'
import WithdrawMembershipButton from '../WithdrawMembershipButton/WithdrawMembershipButton'
import encodeJoinRedirect from '@//:modules/support/encodeJoinRedirect'

interface Props extends ButtonProps {
  clubQuery: JoinClubFromPostFragment$key
  viewerQuery: JoinClubFromPostViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment JoinClubFromPostFragment on Club {
    ...BecomeMemberButtonClubFragment
    ...WithdrawMembershipButtonClubFragment
    viewerMember {
      isSupporter
    }
    slug
  }
`

const ViewerFragment = graphql`
  fragment JoinClubFromPostViewerFragment on Account {
    ...BecomeMemberButtonViewerFragment
  }
`

export default function JoinClubFromPost ({
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
      <LinkButton
        href={`/${clubData.slug}`}
        colorScheme='orange'
        leftIcon={(
          <Icon
            icon={PremiumStar}
            fill='orange.900'
            h={3}
            w={3}
          />)}
        {...rest}
      >
        <Trans>
          Supporter
        </Trans>
      </LinkButton>
    )
  }

  if (isClubMember) {
    return (
      <HStack spacing={2}>
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
        <WithdrawMembershipButton
          clubQuery={clubData}
          p={0}
          {...rest}
        >
          <Icon
            icon={RemoveCross}
            fill='gray.100'
            h={3}
            w={3}
          />
        </WithdrawMembershipButton>
      </HStack>
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
