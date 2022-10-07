import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import { AddPlus } from '@//:assets/icons/interface'
import { MobileDropdownMenuButtonClubClubQuery } from '@//:artifacts/MobileDropdownMenuButtonClubClubQuery.graphql'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'
import MobileHorizontalNavigationDropdownMenuButton
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/MobileHorizontalNavigationDropdownMenu/MobileHorizontalNavigationDropdownMenuButton/MobileHorizontalNavigationDropdownMenuButton'

const Query = graphql`
  query MobileDropdownMenuButtonClubClubQuery {
    viewer {
      clubs(first: 1) @connection(key: "CreateClubListener_clubs") {
        edges {
          node {
            name
            slug
            ...ClubIconFragment
          }
        }
      }
    }
  }
`

export default function MobileDropdownMenuButtonClub (): JSX.Element {
  const data = useLazyLoadQuery<MobileDropdownMenuButtonClubClubQuery>(Query, {})

  if (data.viewer?.clubs?.edges == null || data?.viewer?.clubs?.edges.length < 1) {
    return (
      <MobileHorizontalNavigationDropdownMenuButton
        href='/clubs/create-club'
        icon={AddPlus}
        label={
          <Trans>
            Create a Club
          </Trans>
        }
      />
    )
  }

  const selectedClub = data.viewer?.clubs.edges[0].node

  return (
    <MobileHorizontalNavigationDropdownMenuButton
      href={{
        pathname: '/club/[slug]/home',
        query: { slug: selectedClub.slug }
      }}
      label={selectedClub.name}
    >
      <ClubIcon size='md' clubQuery={selectedClub} />
    </MobileHorizontalNavigationDropdownMenuButton>
  )
}
