import { graphql, useFragment } from 'react-relay/hooks'
import type {
  AdminClubSupporterSubscriptionClubFragment$key
} from '@//:artifacts/AdminClubSupporterSubscriptionClubFragment.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import LargeClubHeader from '../../../../../ManageClub/components/LargeClubHeader/LargeClubHeader'
import { LinkTile } from '@//:modules/content/ContentSelection'

interface Props {
  query: AdminClubSupporterSubscriptionClubFragment$key
}

const Fragment = graphql`
  fragment AdminClubSupporterSubscriptionClubFragment on IAccountClubSupporterSubscription {
    club {
      ...LargeClubHeaderFragment
      slug
    }
  }
`

export default function AdminClubSupporterSubscriptionClub ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={8}>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle>
            <Trans>
              Club
            </Trans>
          </PageSectionTitle>
        </PageSectionWrap>
        <LinkTile to={`/${data.club.slug}`}>
          <LargeClubHeader query={data.club} />
        </LinkTile>
      </Box>
    </Stack>
  )
}
