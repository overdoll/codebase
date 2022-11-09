import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubSettingsQuery } from '@//:artifacts/ClubSettingsQuery.graphql'
import { Stack } from '@chakra-ui/react'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import { PagePanelIcon, PagePanelText, PagePanelWrap } from '@//:modules/content/PageLayout'
import { AddDescription, Barcode, CardPostsView, PictureIdentifier, SeriesIdentifier } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { useRouter } from 'next/router'
import ClubInformationBanner from '../../../../../../common/components/ClubInformationBanner/ClubInformationBanner'

interface Props {
  query: PreloadedQuery<ClubSettingsQuery>
}

const Query = graphql`
  query ClubSettingsQuery($slug: String!) {
    club(slug: $slug) {
      id
      slug
      name
      viewerIsOwner
      ...ClubInformationBannerFragment
      ...ClubIconFragment
    }
    viewer {
      isStaff
    }
  }
`

export default function ClubSettings ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubSettingsQuery>(
    Query,
    query
  )

  const { query: { slug } } = useRouter()

  if (queryData?.club == null) {
    return <NotFoundClub />
  }

  if (!queryData.club?.viewerIsOwner && ((queryData.viewer?.isStaff) === false)) {
    return <NotFoundClub />
  }

  return (
    <Stack spacing={2}>
      <ClubInformationBanner query={queryData.club} />
      <PagePanelWrap href={{
        pathname: '/club/[slug]/settings/name',
        query: { slug: slug as string }
      }}
      >
        <PagePanelIcon icon={Barcode} colorScheme='green' />
        <PagePanelText
          title={
            <Trans>Update Name</Trans>
          }
          description={queryData.club.name}
        />
      </PagePanelWrap>
      <PagePanelWrap href={{
        pathname: '/club/[slug]/settings/blurb',
        query: { slug: slug as string }
      }}
      >
        <PagePanelIcon icon={AddDescription} colorScheme='orange' />
        <PagePanelText
          title={
            <Trans>Update Blurb</Trans>
          }
          description={<Trans>Update your club description</Trans>}
        />
      </PagePanelWrap>
      <PagePanelWrap href={{
        pathname: '/club/[slug]/settings/aliases',
        query: { slug: slug as string }
      }}
      >
        <PagePanelIcon icon={SeriesIdentifier} colorScheme='teal' />
        <PagePanelText
          title={
            <Trans>Manage Aliases</Trans>
          }
          description={`overdoll.com/${queryData.club.slug}`}
        />
      </PagePanelWrap>
      <PagePanelWrap href={{
        pathname: '/club/[slug]/settings/thumbnail',
        query: { slug: slug as string }
      }}
      >
        <PagePanelIcon icon={PictureIdentifier} colorScheme='purple' />
        <PagePanelText
          title={
            <Trans>Club Thumbnail</Trans>
          }
          description={<Trans>Update your club thumbnail</Trans>}
        />
      </PagePanelWrap>
      <PagePanelWrap href={{
        pathname: '/club/[slug]/settings/header',
        query: { slug: slug as string }
      }}
      >
        <PagePanelIcon icon={CardPostsView} colorScheme='primary' />
        <PagePanelText
          title={
            <Trans>Club Header</Trans>
          }
          description={<Trans>Update your club header</Trans>}
        />
      </PagePanelWrap>
    </Stack>
  )
}
