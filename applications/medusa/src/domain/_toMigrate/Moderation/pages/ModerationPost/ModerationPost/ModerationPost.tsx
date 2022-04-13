import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ModerationPostQuery } from '@//:artifacts/ModerationPostQuery.graphql'
import { Box, HStack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Wrap } from '@chakra-ui/react'
import { NotFoundPublicPost } from '@//:modules/content/Placeholder'
import { PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { PostVideoManagerProvider } from '@//:modules/content/Posts'
import { useSearch } from '@//:modules/content/HookedComponents/Search'
import SearchDateRange, {
  getDateRangeDefault
} from '@//:modules/content/HookedComponents/Search/components/SearchDateRange/SearchDateRange'
import QueryErrorBoundary
  from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { Suspense } from 'react'
import ViewPostReports from './ViewPostReports/ViewPostReports'
import PostPreview from '../../Queue/Posts/PostPreview/PostPreview'
import { ObserverManagerProvider } from '@//:modules/content/Posts/support/ObserverManager/ObserverManager'
import PostTagsPreview from '../../Queue/Posts/PostTagsPreview/PostTagsPreview'
import ModerationPostActions from './ModerationPostActions/ModerationPostActions'
import TagHeader from '../../../../Staff/components/TagHeader/TagHeader'
import LargeAccountHeader from '../../../../Staff/components/LargeAccountHeader/LargeAccountHeader'
import LargeClubHeader from '../../../../ManageClub/components/LargeClubHeader/LargeClubHeader'
import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import ClubPageButton from '../../../../PublicClub/PublicClub/ClubMenu/ClubPageButton/ClubPageButton'
import ClubStaffButton from '../../../../PublicClub/PublicClub/ClubMenu/ClubStaffButton/ClubStaffButton'
import ProfilePageButton from '../../../../Profile/Profile/ProfileMenu/ProfilePageButton/ProfilePageButton'
import ProfileStaffButton from '../../../../Profile/Profile/ProfileMenu/ProfileStaffButton/ProfileStaffButton'

interface Props {
  query: PreloadedQuery<ModerationPostQuery>
}

interface SearchProps {
  from: Date
  to: Date
  reference: string
}

const Query = graphql`
  query ModerationPostQuery($reference: String!) {
    post(reference: $reference) @required(action: THROW) {
      __typename
      reference
      state
      contributor {
        ...LargeAccountHeaderFragment
        ...ProfilePageButtonFragment
        ...ProfileStaffButtonFragment
      }
      club {
        ...LargeClubHeaderFragment
        ...ClubStaffButtonFragment
        ...ClubPageButtonFragment
      }
      ...PostPreviewFragment
      ...PostTagsPreviewFragment
      ...ModerationPostActionsFragment
    }
  }
`

export default function ModerationPost ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ModerationPostQuery>(
    Query,
    query
  )

  if (queryData?.post == null) {
    return <NotFoundPublicPost />
  }

  const {
    searchArguments,
    register,
    loadQuery
  } = useSearch<SearchProps>({
    defaultValue: {
      ...getDateRangeDefault(),
      reference: queryData.post.reference
    }
  })

  return (
    <Stack spacing={4}>
      <ObserverManagerProvider>
        <PostVideoManagerProvider>
          <PostPreview query={queryData.post} />
        </PostVideoManagerProvider>
      </ObserverManagerProvider>
      <Tabs colorScheme='gray' variant='soft-rounded'>
        <TabList>
          <Wrap>
            <Tab>
              <Trans>
                Information
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Reports
              </Trans>
            </Tab>
            <Tab>
              <Trans>
                Actions
              </Trans>
            </Tab>
          </Wrap>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack spacing={8}>
              <Box>
                <PageSectionWrap>
                  <PageSectionTitle>
                    <Trans>
                      State
                    </Trans>
                  </PageSectionTitle>
                  <TagHeader>
                    {queryData.post.state}
                  </TagHeader>
                </PageSectionWrap>
              </Box>
              <Box>
                <PageSectionWrap>
                  <PageSectionTitle>
                    <Trans>
                      Club
                    </Trans>
                  </PageSectionTitle>
                  <HStack spacing={2} justify='space-between'>
                    <LargeClubHeader query={queryData.post.club} />
                    <Menu
                      p={1}
                    >
                      <ClubPageButton query={queryData.post.club} />
                      <ClubStaffButton query={queryData.post.club} />
                    </Menu>
                  </HStack>
                </PageSectionWrap>
              </Box>
              <Box>
                <PageSectionWrap>
                  <PageSectionTitle>
                    <Trans>
                      Contributor
                    </Trans>
                  </PageSectionTitle>
                  <HStack spacing={2} justify='space-between'>
                    <LargeAccountHeader query={queryData.post.contributor} />
                    <Menu
                      p={1}
                    >
                      <ProfilePageButton query={queryData.post.contributor} />
                      <ProfileStaffButton query={queryData.post.contributor} />
                    </Menu>
                  </HStack>
                </PageSectionWrap>
              </Box>
              <Box>
                <PageSectionWrap>
                  <PageSectionTitle>
                    <Trans>
                      Tags
                    </Trans>
                  </PageSectionTitle>
                  <PostTagsPreview query={queryData.post} />
                </PageSectionWrap>
              </Box>
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack spacing={2}>
              <SearchDateRange {...register('dateRange', 'change')} />
              <QueryErrorBoundary loadQuery={loadQuery}>
                <Suspense fallback={<SkeletonStack />}>
                  <ViewPostReports searchArguments={searchArguments} />
                </Suspense>
              </QueryErrorBoundary>
            </Stack>
          </TabPanel>
          <TabPanel>
            <ModerationPostActions query={queryData.post} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
