import { useToast } from '@chakra-ui/react'
import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { CurationSettingsQuery as CurationSettingsQueryType } from '@//:artifacts/CurationSettingsQuery.graphql'
import { PagePanelIcon, PagePanelText, PagePanelWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { BirdHouse } from '@//:assets/icons/navigation'

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
    }
  }
`

export default function CurationSettings (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<CurationSettingsQueryType>(
    Query,
    props.query
  )

  const notify = useToast()

  return (
    <>
      <PagePanelWrap path='/configure/curation-profile'>
        <PagePanelIcon icon={BirdHouse} colorScheme='orange' />
        <PagePanelText
          title={
            <Trans>Complete Curation Profile</Trans>
          }
          description={(
            <Trans>Set up your curation profile</Trans>
          )}
        />
      </PagePanelWrap>
    </>
  )
}
