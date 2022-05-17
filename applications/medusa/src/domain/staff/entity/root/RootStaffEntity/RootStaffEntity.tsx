import {
  PagePanelIcon,
  PagePanelText,
  PagePanelWrap,
  PageSectionTitle,
  PageSectionWrap,
  PageWrapper
} from '@//:modules/content/PageLayout'
import {
  AddPlus,
  CategoryIdentifier,
  CharacterIdentifier,
  ClubPeopleGroup,
  FlagReport,
  SeriesIdentifier
} from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { Box, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import { PageProps } from '@//:types/app'
import Can from '@//:modules/authorization/Can'

const RootStaffEntity: PageProps<{}> = () => {
  return (
    <>
      <Head>
        <title>
          Manage - Staff :: overdoll
        </title>
      </Head>
      <PageWrapper>
        <Can I='staff' a='Entity'>
          <Stack spacing={4}>
            <Box>
              <PageSectionWrap>
                <PageSectionTitle>
                  <Trans>
                    Characters
                  </Trans>
                </PageSectionTitle>
                <Stack spacing={2}>
                  <PagePanelWrap href='/staff/entity/character/create'>
                    <PagePanelIcon icon={AddPlus} colorScheme='teal' />
                    <PagePanelText
                      title={
                        <Trans>Create Character</Trans>
                      }
                      description={(
                        <Trans>Create a character</Trans>
                      )}
                    />
                  </PagePanelWrap>
                  <PagePanelWrap href='/staff/entity/character/search'>
                    <PagePanelIcon icon={CharacterIdentifier} colorScheme='purple' />
                    <PagePanelText
                      title={
                        <Trans>Search Characters</Trans>
                      }
                      description={(
                        <Trans>Search or manage characters</Trans>
                      )}
                    />
                  </PagePanelWrap>
                </Stack>
              </PageSectionWrap>
            </Box>
            <Box>
              <PageSectionWrap>
                <PageSectionTitle>
                  <Trans>
                    Series
                  </Trans>
                </PageSectionTitle>
                <Stack spacing={2}>
                  <PagePanelWrap href='/staff/entity/series/create'>
                    <PagePanelIcon icon={AddPlus} colorScheme='teal' />
                    <PagePanelText
                      title={
                        <Trans>Create Series</Trans>
                      }
                      description={(
                        <Trans>Create a series</Trans>
                      )}
                    />
                  </PagePanelWrap>
                  <PagePanelWrap href='/staff/entity/series/search'>
                    <PagePanelIcon icon={SeriesIdentifier} colorScheme='purple' />
                    <PagePanelText
                      title={
                        <Trans>Search Series</Trans>
                      }
                      description={(
                        <Trans>Search or manage series</Trans>
                      )}
                    />
                  </PagePanelWrap>
                </Stack>
              </PageSectionWrap>
            </Box>
            <Box>
              <PageSectionWrap>
                <PageSectionTitle>
                  <Trans>
                    Categories
                  </Trans>
                </PageSectionTitle>
                <Stack spacing={2}>
                  <PagePanelWrap href='/staff/entity/category/create'>
                    <PagePanelIcon icon={AddPlus} colorScheme='teal' />
                    <PagePanelText
                      title={
                        <Trans>Create Category</Trans>
                      }
                      description={(
                        <Trans>Create a category</Trans>
                      )}
                    />
                  </PagePanelWrap>
                  <PagePanelWrap href='/staff/entity/category/search'>
                    <PagePanelIcon icon={CategoryIdentifier} colorScheme='purple' />
                    <PagePanelText
                      title={
                        <Trans>Search Categories</Trans>
                      }
                      description={(
                        <Trans>Search or manage categories</Trans>
                      )}
                    />
                  </PagePanelWrap>
                </Stack>
              </PageSectionWrap>
            </Box>
            <Box>
              <PageSectionWrap>
                <PageSectionTitle>
                  <Trans>
                    Audiences
                  </Trans>
                </PageSectionTitle>
                <Stack spacing={2}>
                  <PagePanelWrap href='/staff/entity/audience/create'>
                    <PagePanelIcon icon={AddPlus} colorScheme='teal' />
                    <PagePanelText
                      title={
                        <Trans>Create Audience</Trans>
                      }
                      description={(
                        <Trans>Create an audience</Trans>
                      )}
                    />
                  </PagePanelWrap>
                  <PagePanelWrap href='/staff/entity/audience/search'>
                    <PagePanelIcon icon={ClubPeopleGroup} colorScheme='purple' />
                    <PagePanelText
                      title={
                        <Trans>Search Audiences</Trans>
                      }
                      description={(
                        <Trans>Search or manage audiences</Trans>
                      )}
                    />
                  </PagePanelWrap>
                </Stack>
              </PageSectionWrap>
            </Box>
            <Box>
              <PageSectionWrap>
                <PageSectionTitle>
                  <Trans>
                    Rules
                  </Trans>
                </PageSectionTitle>
                <Stack spacing={2}>
                  <PagePanelWrap href='/staff/entity/rule/create'>
                    <PagePanelIcon icon={AddPlus} colorScheme='teal' />
                    <PagePanelText
                      title={
                        <Trans>Create Rule</Trans>
                      }
                      description={(
                        <Trans>Create a rule</Trans>
                      )}
                    />
                  </PagePanelWrap>
                  <PagePanelWrap href='/staff/entity/rule/search'>
                    <PagePanelIcon icon={FlagReport} colorScheme='purple' />
                    <PagePanelText
                      title={
                        <Trans>Search Rules</Trans>
                      }
                      description={(
                        <Trans>Search or manage rules</Trans>
                      )}
                    />
                  </PagePanelWrap>
                </Stack>
              </PageSectionWrap>
            </Box>
            <Box>
              <PageSectionWrap>
                <PageSectionTitle>
                  <Trans>
                    Cancellation Reasons
                  </Trans>
                </PageSectionTitle>
                <Stack spacing={2}>
                  <PagePanelWrap href='/staff/entity/cancellation-reason/create'>
                    <PagePanelIcon icon={AddPlus} colorScheme='teal' />
                    <PagePanelText
                      title={
                        <Trans>Create Cancellation Reason</Trans>
                      }
                      description={(
                        <Trans>Create a cancellation reason</Trans>
                      )}
                    />
                  </PagePanelWrap>
                  <PagePanelWrap href='/staff/entity/cancellation-reason/search'>
                    <PagePanelIcon icon={FlagReport} colorScheme='purple' />
                    <PagePanelText
                      title={
                        <Trans>Search Cancellation Reasons</Trans>
                      }
                      description={(
                        <Trans>Search or manage cancellation reasons</Trans>
                      )}
                    />
                  </PagePanelWrap>
                </Stack>
              </PageSectionWrap>
            </Box>
          </Stack>
        </Can>
      </PageWrapper>
    </>
  )
}

export default RootStaffEntity
