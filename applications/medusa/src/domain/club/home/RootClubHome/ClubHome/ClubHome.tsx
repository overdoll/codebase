import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubHomeQuery } from '@//:artifacts/ClubHomeQuery.graphql'
import LargeClubHeader from './LargeClubHeader/LargeClubHeader'
import { Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import Head from 'next/head'
import { ClubPeopleGroup } from '@//:assets/icons'
import StatisticHeader from '../../../../../common/components/StatisticHeader/StatisticHeader'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { useRouter } from 'next/router'
import ClubBalanceHeader from './ClubBalanceHeader/ClubBalanceHeader'
import ClubSupporterHeader from './ClubSupporterHeader/ClubSupporterHeader'
import ClubInformationBanner from '../../../../../common/components/ClubInformationBanner/ClubInformationBanner'

interface Props {
  query: PreloadedQuery<ClubHomeQuery>
}

const Query = graphql`
  query ClubHomeQuery($slug: String!) @preloadable {
    club(slug: $slug) {
      name
      membersCount
      slug
      viewerIsOwner
      ...LargeClubHeaderFragment
      ...ClubBalanceHeaderFragment
      ...ClubSupporterHeaderFragment
      ...ClubInformationBannerFragment
    }
    viewer {
      isStaff
    }
  }
`

export default function ClubHome ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubHomeQuery>(
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

  const number = (queryData?.club?.membersCount ?? 0).toLocaleString()

  const title = `Manage ${queryData.club.name} - overdoll`

  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <ClubInformationBanner query={queryData.club} />
      <Stack spacing={8}>
        <LargeClubHeader query={queryData.club} />
        <Stack spacing={4}>
          <LinkTile href={{
            pathname: '/club/[slug]/members',
            query: { slug: slug as string }
          }}
          >
            <StatisticHeader
              icon={ClubPeopleGroup}
              title={(
                <Trans>
                  Members
                </Trans>)}
            >
              {number}
            </StatisticHeader>
          </LinkTile>
          <ClubSupporterHeader query={queryData.club} />
          <ClubBalanceHeader query={queryData.club} />
        </Stack>
      </Stack>
    </>
  )
}
