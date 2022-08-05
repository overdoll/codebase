import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { CreateClubCharacterQuery } from '@//:artifacts/CreateClubCharacterQuery.graphql'
import { NotFoundClub } from '@//:modules/content/Placeholder'
import DisabledClubCharacters
  from '../../../root/RootClubCharacters/ClubCharacters/DisabledClubCharacters/DisabledClubCharacters'
import RestrictedClubCharacters
  from '../../../root/RootClubCharacters/ClubCharacters/RestrictedClubCharacters/RestrictedClubCharacters'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import CreateClubCharacterForm from './CreateClubCharacterForm/CreateClubCharacterForm'
import BackButton from '@//:modules/content/PageLayout/BuildingBlocks/BackButton/BackButton'

interface Props {
  query: PreloadedQuery<CreateClubCharacterQuery>
}

const Query = graphql`
  query CreateClubCharacterQuery($slug: String!) {
    club(slug: $slug) {
      slug
      viewerIsOwner
      charactersEnabled
      suspension {
        __typename
      }
      termination {
        __typename
      }
      ...RestrictedClubCharactersFragment
      ...ManageClubCharactersFragment
      ...CreateClubCharacterFormFragment
    }
  }
`

export default function CreateClubCharacter ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<CreateClubCharacterQuery>(
    Query,
    query
  )

  if (queryData.club == null) {
    return <NotFoundClub />
  }

  if (!queryData.club?.viewerIsOwner) {
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
      <BackButton
        href={{
          pathname: '/club/[slug]/characters',
          query: { slug: queryData.club.slug }
        }}
      >
        <Trans>
          Back to Characters
        </Trans>
      </BackButton>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Create Club Character
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            Create a club character to use in your posts
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <CreateClubCharacterForm query={queryData.club} />
    </>
  )
}
