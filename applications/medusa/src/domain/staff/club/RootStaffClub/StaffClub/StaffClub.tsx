import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffClubQuery } from '@//:artifacts/StaffClubQuery.graphql'
import { Box, HStack, Stack } from '@chakra-ui/react'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import StaffClubStatus from './StaffClubStatus/StaffClubStatus'
import StaffClubInfractions from './StaffClubInfractions/StaffClubInfractions'
import LargeClubHeader from '../../../../club/home/RootClubHome/ClubHome/LargeClubHeader/LargeClubHeader'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import LargeAccountHeader from '../../../../../common/components/LargeAccountHeader/LargeAccountHeader'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import ClubPageButton from '../../../../[slug]/root/RootPublicClub/PublicClub/ClubMenu/ClubPageButton/ClubPageButton'
import ProfilePageButton from '../../../../profile/RootProfile/Profile/ProfileMenu/ProfilePageButton/ProfilePageButton'
import ProfileStaffButton from '../../../../profile/RootProfile/Profile/ProfileMenu/ProfileStaffButton/ProfileStaffButton'

interface Props {
  query: PreloadedQuery<StaffClubQuery>
}

const Query = graphql`
  query StaffClubQuery($slug: String!) {
    club(slug: $slug) {
      __typename
      ...LargeClubHeaderFragment
      ...StaffClubStatusFragment
      ...StaffClubInfractionsFragment
      ...ClubPageButtonFragment
      owner {
        ...LargeAccountHeaderFragment
        ...ProfilePageButtonFragment
        ...ProfileStaffButtonFragment
      }
    }
  }
`

export default function StaffClub ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<StaffClubQuery>(
    Query,
    query
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  return (
    <Stack spacing={6}>
      <HStack spacing={2} justify='space-between'>
        <LargeClubHeader query={queryData.club} />
        <Menu
          p={1}
        >
          <ClubPageButton query={queryData.club} />
        </Menu>
      </HStack>
      <Stack spacing={8}>
        <Box>
          <StaffClubStatus query={queryData.club} />
        </Box>
        <Box>
          <StaffClubInfractions query={queryData.club} />
        </Box>
        <Box>
          <PageSectionWrap>
            <PageSectionTitle colorScheme='teal'>
              <Trans>
                Owner
              </Trans>
            </PageSectionTitle>
          </PageSectionWrap>
          <HStack spacing={2} justify='space-between'>
            <LargeAccountHeader query={queryData.club.owner} />
            <Menu
              p={1}
            >
              <ProfilePageButton query={queryData.club.owner} />
              <ProfileStaffButton query={queryData.club.owner} />
            </Menu>
          </HStack>
        </Box>
      </Stack>
    </Stack>
  )
}
