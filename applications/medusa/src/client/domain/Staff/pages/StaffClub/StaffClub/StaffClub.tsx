import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { StaffClubQuery } from '@//:artifacts/StaffClubQuery.graphql'
import { Box, HStack, Stack } from '@chakra-ui/react'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import StaffClubStatus from './StaffClubStatus/StaffClubStatus'
import StaffClubInfractions from './StaffClubInfractions/StaffClubInfractions'
import LargeClubHeader from '../../../../ManageClub/components/LargeClubHeader/LargeClubHeader'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import LargeAccountHeader from '../../../components/LargeAccountHeader/LargeAccountHeader'
import { LinkTile } from '@//:modules/content/ContentSelection'

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
      owner {
        username
        ...LargeAccountHeaderFragment
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
      <HStack spacing={3}>
        <LargeClubHeader query={queryData.club} />
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
          <LinkTile to={`/staff/account/${queryData.club.owner.username}`}>
            <LargeAccountHeader query={queryData.club.owner} />
          </LinkTile>
        </Box>
      </Stack>
    </Stack>
  )
}
