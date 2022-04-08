import { Helmet } from 'react-helmet-async'
import {
  PagePanelIcon,
  PagePanelText,
  PagePanelWrap,
  PageSectionTitle,
  PageSectionWrap,
  PageWrapper
} from '@//:modules/content/PageLayout'
import QueryErrorBoundary from '@//:modules/content/Placeholder/Fallback/QueryErrorBoundary/QueryErrorBoundary'
import { ReactNode, Suspense } from 'react'
import SkeletonStack from '@//:modules/content/Placeholder/Loading/SkeletonStack/SkeletonStack'
import { PreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import ClubSettingsQuery, { ClubSettingsQuery as ClubSettingsQueryType } from '@//:artifacts/ClubSettingsQuery.graphql'
import ClubSettings from './ClubSettings/ClubSettings'
import { useParams } from '@//:modules/routing/useParams'
import { Trans } from '@lingui/macro'
import ChildrenBoundary from '../../../../components/ChildrenBoundary/ChildrenBoundary'
import { Box, Stack } from '@chakra-ui/react'
import { ClubPeopleGroup } from '@//:assets/icons'
import { CLUB_GUIDELINES } from '@//:modules/constants/links'

interface Props {
  prepared: {
    query: PreloadedQuery<ClubSettingsQueryType>
  }
  children: ReactNode
}

export default function RootClubSettings (props: Props): JSX.Element {
  const [queryRef, loadQuery] = useQueryLoader(
    ClubSettingsQuery,
    props.prepared.query
  )

  const match = useParams()

  return (
    <ChildrenBoundary fallback={props.children}>
      <Helmet>
        <title>
          Club Settings :: overdoll.com
        </title>
      </Helmet>
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
            <QueryErrorBoundary loadQuery={() => loadQuery({ slug: match.slug as string })}>
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
            <PagePanelWrap isExternal path={CLUB_GUIDELINES}>
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
    </ChildrenBoundary>
  )
}
