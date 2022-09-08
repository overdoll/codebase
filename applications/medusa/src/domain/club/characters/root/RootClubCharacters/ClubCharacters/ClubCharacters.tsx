import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { ClubCharactersQuery } from '@//:artifacts/ClubCharactersQuery.graphql'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import Head from 'next/head'
import DisabledClubCharacters from './DisabledClubCharacters/DisabledClubCharacters'
import RestrictedClubCharacters from './RestrictedClubCharacters/RestrictedClubCharacters'
import ManageClubCharacters from './ManageClubCharacters/ManageClubCharacters'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'

interface Props {
  query: PreloadedQuery<ClubCharactersQuery>
}

const Query = graphql`
  query ClubCharactersQuery($slug: String!) {
    club(slug: $slug) {
      name
      viewerIsOwner
      charactersEnabled
      suspension {
        __typename
      }
      termination {
        __typename
      }
      charactersLimit
      charactersCount
      ...RestrictedClubCharactersFragment
      ...ManageClubCharactersFragment
    }
    viewer {
      isStaff
      isWorker
    }
  }
`

export default function ClubCharacters ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<ClubCharactersQuery>(
    Query,
    query
  )

  if (queryData.club == null) {
    return <NotFoundClub />
  }

  if (!queryData.club?.viewerIsOwner && ((queryData.viewer?.isStaff) === false) && !(queryData.viewer?.isWorker)) {
    return <NotFoundClub />
  }

  if (!queryData.club.charactersEnabled) {
    return <DisabledClubCharacters />
  }

  if ((queryData.club?.suspension != null || queryData.club?.termination != null)) {
    return <RestrictedClubCharacters query={queryData.club} />
  }

  return (
    <>
      <Head>
        <title>
          {queryData.club.name}'s Characters - overdoll
        </title>
      </Head>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Club Characters ({queryData.club.charactersCount}/{queryData.club.charactersLimit})
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            A custom club character is one that you own and would like to post your content under.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <ManageClubCharacters query={queryData.club} />
    </>
  )
}
