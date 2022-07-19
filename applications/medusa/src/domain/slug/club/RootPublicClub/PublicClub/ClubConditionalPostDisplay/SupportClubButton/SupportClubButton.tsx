import type { SupportClubButtonClubFragment$key } from '@//:artifacts/SupportClubButtonClubFragment.graphql'
import type { SupportClubButtonViewerFragment$key } from '@//:artifacts/SupportClubButtonViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import {
  Box,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text
} from '@chakra-ui/react'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import encodeJoinRedirect from '@//:modules/support/encodeJoinRedirect'
import SupportClubPriceButton, { SUPPORT_BUTTON_PROPS } from './SupportClubPriceButton/SupportClubPriceButton'
import SupportClubModal from './SupportClubModal/SupportClubModal'

interface Props {
  clubQuery: SupportClubButtonClubFragment$key
  viewerQuery: SupportClubButtonViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment SupportClubButtonClubFragment on Club {
    slug
    canSupport
    viewerIsOwner
    ...SupportClubPriceButtonFragment
    ...SupportClubModalFragment
  }
`

const ViewerFragment = graphql`
  fragment SupportClubButtonViewerFragment on Account {
    ...SupportClubModalViewerFragment
  }
`

export default function SupportClubButton ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)
  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const redirect = encodeJoinRedirect({
    pathname: '/[slug]',
    query: {
      slug: clubData.slug
    }
  })

  if (viewerData == null) {
    if (!clubData.canSupport) {
      return (
        <></>
      )
    }

    return (
      <Stack spacing={1}>
        <LinkButton
          {...SUPPORT_BUTTON_PROPS}
          href={redirect}
        />
        <Text fontSize='md' color='gray.00'>
          <Trans>
            Create an account and become a supporter to get access to this club's exclusive content!
          </Trans>
        </Text>
      </Stack>
    )
  }

  const SupporterOwnerButton = (): JSX.Element => {
    if (clubData.canSupport) {
      return (
        <Stack spacing={1}>
          <Box w='100%'>
            <Popover>
              <PopoverTrigger>
                <SupportClubPriceButton
                  query={clubData}
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverCloseButton />
                <PopoverHeader fontWeight='semibold'>
                  <Trans>You are the owner</Trans>
                </PopoverHeader>
                <PopoverBody textAlign='left' fontSize='sm'>Because you are the owner of the club, you are a supporter
                  without an active subscription.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          <Text fontSize='md' color='gray.00'>
            <Trans>
              Support this club and get access to all of its exclusive content!
            </Trans>
          </Text>
        </Stack>
      )
    }

    return <></>
  }

  if (clubData.viewerIsOwner) {
    return (
      <SupporterOwnerButton />
    )
  }

  return (
    <SupportClubModal clubQuery={clubData} viewerQuery={viewerData} />
  )
}
