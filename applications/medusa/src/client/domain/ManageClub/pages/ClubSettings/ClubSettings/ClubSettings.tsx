import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubSettingsQuery } from '@//:artifacts/ClubSettingsQuery.graphql'
import { Stack } from '@chakra-ui/react'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import { PagePanelIcon, PagePanelText, PagePanelWrap, ResourceIcon } from '@//:modules/content/PageLayout'
import { Barcode, SeriesIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<ClubSettingsQuery>
}

const Query = graphql`
  query ClubSettingsQuery($slug: String!) {
    club(slug: $slug) {
      slug
      name
      thumbnail {
        ...ResourceIconFragment
      }
    }
  }
`

export default function ClubSettings ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubSettingsQuery>(
    Query,
    query
  )

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  return (
    <Stack spacing={2}>
      <PagePanelWrap path={`/club/${queryData.club.slug}/settings/name`}>
        <PagePanelIcon icon={Barcode} colorScheme='green' />
        <PagePanelText
          title={
            <Trans>Update Name</Trans>
          }
          description={queryData.club.name}
        />
      </PagePanelWrap>
      <PagePanelWrap path={`/club/${queryData.club.slug}/settings/aliases`}>
        <PagePanelIcon icon={SeriesIdentifier} colorScheme='teal' />
        <PagePanelText
          title={
            <Trans>Manage Aliases</Trans>
          }
          description={`overdoll.com/${queryData.club.slug}`}
        />
      </PagePanelWrap>
      <PagePanelWrap path={`/club/${queryData.club.slug}/settings/thumbnail`}>
        <ResourceIcon
          h={10}
          w={10}
          borderRadius='md'
          query={queryData.club.thumbnail}
        />
        <PagePanelText
          title={
            <Trans>Club Thumbnail</Trans>
          }
          description={<Trans>Update your club thumbnail</Trans>}
        />
      </PagePanelWrap>
    </Stack>
  )
}
