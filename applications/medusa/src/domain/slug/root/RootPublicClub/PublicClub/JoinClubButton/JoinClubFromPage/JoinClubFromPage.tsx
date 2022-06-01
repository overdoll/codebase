import type { JoinClubFromPageFragment$key } from '@//:artifacts/JoinClubFromPageFragment.graphql'
import type { JoinClubFromPageViewerFragment$key } from '@//:artifacts/JoinClubFromPageViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import {
  Box,
  ButtonProps,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tooltip
} from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { PremiumStar } from '@//:assets/icons'
import BecomeMemberButton from '../BecomeMemberButton/BecomeMemberButton'
import WithdrawMembershipButton from '../WithdrawMembershipButton/WithdrawMembershipButton'
import Button from '@//:modules/form/Button/Button'
import encodeJoinRedirect from '@//:modules/support/encodeJoinRedirect'

interface Props extends ButtonProps {
  clubQuery: JoinClubFromPageFragment$key
  viewerQuery: JoinClubFromPageViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment JoinClubFromPageFragment on Club {
    ...BecomeMemberButtonClubFragment
    ...WithdrawMembershipButtonClubFragment
    viewerMember {
      isSupporter
    }
    viewerIsOwner
    slug
  }
`

const ViewerFragment = graphql`
  fragment JoinClubFromPageViewerFragment on Account {
    ...BecomeMemberButtonViewerFragment
  }
`

export default function JoinClubFromPage ({
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

  if (clubData.viewerIsOwner) {
    return (
      <Box w='100%'>
        <Popover>
          <PopoverTrigger>
            <Button
              colorScheme='gray'
              {...rest}
            >
              <Trans>
                Join
              </Trans>
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverCloseButton />
            <PopoverHeader fontWeight='semibold'>
              <Trans>You are the owner</Trans>
            </PopoverHeader>
            <PopoverBody textAlign='left' fontSize='sm'>Because you are the owner of the club, you are already a member
              and cannot join nor leave the club.
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    )
  }

  if (viewerData == null) {
    return (
      <Box w='100%'>
        <LinkButton
          w='100%'
          href={redirect}
          colorScheme='gray'
          {...rest}
        >
          <Trans>
            Join
          </Trans>
        </LinkButton>
      </Box>

    )
  }

  if (isClubSupporter) {
    return (
      <Tooltip
        label={
          <Trans>
            You cannot leave a club that you are a supporter of
          </Trans>
        }
      >
        <Box w='100%'>
          <Button
            w='100%'
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
              You are a supporter
            </Trans>
          </Button>
        </Box>
      </Tooltip>
    )
  }

  if (isClubMember) {
    return (
      <WithdrawMembershipButton
        w='100%'
        clubQuery={clubData}
        {...rest}
      >
        <Trans>
          Leave
        </Trans>
      </WithdrawMembershipButton>
    )
  }

  return (
    <BecomeMemberButton
      w='100%'
      clubQuery={clubData}
      viewerQuery={viewerData}
      colorScheme='gray'
      {...rest}
    />
  )
}