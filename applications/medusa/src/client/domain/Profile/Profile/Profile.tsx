import { PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { ProfileQuery } from '@//:artifacts/ProfileQuery.graphql'
import { graphql } from 'react-relay'
import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, ResourceIcon } from '@//:modules/content/PageLayout'
import { NotFoundAccount } from '@//:modules/content/Placeholder'
import ProfileMenu from './ProfileMenu/ProfileMenu'
import { TileOverlay } from '@//:modules/content/ContentSelection'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import ProfileSupportedClubs from './ProfileSupportedClubs/ProfileSupportedClubs'
import ProfileContributingClubs from './ProfileContributingClubs/ProfileContributingClubs'

interface Props {
  query: PreloadedQuery<ProfileQuery>
}

const Query = graphql`
  query ProfileQuery($username: String!) {
    account(username: $username) {
      username
      avatar {
        ...ResourceIconFragment
      }
      ...ProfileMenuFragment
      ...ProfileSupportedClubsFragment
      ...ProfileContributingClubsFragment
    }
  }
`

export default function Profile (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<ProfileQuery>(
    Query,
    props.query
  )

  if (queryData?.account == null) {
    return <NotFoundAccount />
  }

  return (
    <Stack spacing={8}>
      <Box h={200}>
        <TileOverlay
          backdrop={(
            <ResourceItem
              query={null}
            />)}
        >
          <Flex h='100%' w='100%' align='center' justify='center' position='relative'>
            <Stack align='center' p={4} spacing={2}>
              <ResourceIcon w={16} h={16} query={queryData?.account?.avatar} />
              <Heading color='gray.00' fontSize='4xl'>
                {queryData?.account?.username}
              </Heading>
            </Stack>
            <Flex top={0} right={0} position='absolute'>
              <ProfileMenu query={queryData?.account} />
            </Flex>
          </Flex>
        </TileOverlay>
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='orange'>
            Supporting
          </PageSectionTitle>
        </PageSectionWrap>
        <ProfileSupportedClubs query={queryData?.account} />
      </Box>
      <Box>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='orange'>
            Contributing
          </PageSectionTitle>
        </PageSectionWrap>
        <ProfileContributingClubs query={queryData?.account} />
      </Box>
    </Stack>
  )
}
