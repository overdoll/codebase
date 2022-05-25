import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { CurationSettingsQuery as CurationSettingsQueryType } from '@//:artifacts/CurationSettingsQuery.graphql'
import { PagePanelIcon, PagePanelText, PagePanelWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { BirdHouse } from '@//:assets/icons/navigation'
import { Stack } from '@chakra-ui/react'
import AccountInformationBanner
  from '../../../../../../common/components/AccountInformationBanner/AccountInformationBanner'

interface Props {
  query: PreloadedQuery<CurationSettingsQueryType>
}

const Query = graphql`
  query CurationSettingsQuery {
    viewer {
      curationProfile {
        id
        completed
      }
      ...AccountInformationBannerFragment
    }
  }
`

export default function CurationSettings (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<CurationSettingsQueryType>(
    Query,
    props.query
  )

  const curationProfileCompleted = queryData?.viewer?.curationProfile.completed === true

  return (
    <>
      <AccountInformationBanner query={queryData.viewer} />
      <Stack spacing={4}>
        <PagePanelWrap href='/settings/preferences/curation-profile'>
          <PagePanelIcon icon={BirdHouse} colorScheme='orange' />
          <PagePanelText
            title={
              curationProfileCompleted
                ? <Trans>Modify Curation Profile</Trans>
                : <Trans>Complete Curation Profile</Trans>
            }
            description={(
              curationProfileCompleted
                ? <Trans>Reconfigure your curation profile</Trans>
                : <Trans>Set up your curation profile</Trans>
            )}
          />
        </PagePanelWrap>
      </Stack>
    </>
  )
}
