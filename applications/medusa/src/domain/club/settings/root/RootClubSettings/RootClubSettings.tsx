import {
  PagePanelIcon,
  PagePanelText,
  PagePanelWrap,
  PageSectionTitle,
  PageSectionWrap,
  PageWrapper
} from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ClubSettingsQuery, { ClubSettingsQuery as ClubSettingsQueryType } from '@//:artifacts/ClubSettingsQuery.graphql'
import ClubSettings from './ClubSettings/ClubSettings'
import { Trans } from '@lingui/macro'
import { Box, Stack } from '@chakra-ui/react'
import { ClubPeopleGroup } from '@//:assets/icons'
import { CLUB_GUIDELINES } from '@//:modules/constants/links'
import { useRouter } from 'next/router'
import { PageProps } from '@//:types/app'
import Head from 'next/head'

interface Props {
  queryRefs: {
    clubSettingsQuery: PreloadedQuery<ClubSettingsQueryType>
  }
}

const RootClubSettings: PageProps<Props> = (props: Props) => {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubSettingsQuery,
    props.queryRefs.clubSettingsQuery
  )

  const { query: { slug } } = useRouter()

  return (
    <>
      <Head>
        <title>
          Club Settings :: overdoll.com
        </title>
      </Head>
      <PageWrapper>
        <Stack spacing={8}>
          <Box>
            <PageSectionWrap>
              <PageSectionTitle>
                <Trans>
                  Settings
                </Trans>
              </PageSectionTitle>
            </PageSectionWrap>
            <QueryErrorBoundary loadQuery={() => loadQuery({ slug: slug as string })}>
              <Suspense fallback={<SkeletonStack />}>
                <ClubSettings query={queryRef as PreloadedQuery<ClubSettingsQueryType>} />
              </Suspense>
            </QueryErrorBoundary>
          </Box>
          <Box>
            <PageSectionWrap>
              <PageSectionTitle>
                <Trans>
                  Help
                </Trans>
              </PageSectionTitle>
            </PageSectionWrap>
            <PagePanelWrap isExternal href={CLUB_GUIDELINES}>
              <PagePanelIcon icon={ClubPeopleGroup} colorScheme='purple' />
              <PagePanelText
                title={
                  <Trans>Club Guidelines</Trans>
                }
                description={(
                  <Trans>Content and club guidelines</Trans>
                )}
              />
            </PagePanelWrap>
          </Box>
        </Stack>
      </PageWrapper>
    </>
  )
}

export default RootClubSettings
