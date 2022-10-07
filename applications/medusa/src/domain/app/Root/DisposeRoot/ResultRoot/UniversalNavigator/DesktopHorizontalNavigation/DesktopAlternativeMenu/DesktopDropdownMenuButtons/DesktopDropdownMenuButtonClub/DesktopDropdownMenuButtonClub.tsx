import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import { AddPlus } from '@//:assets/icons/interface'
import { DesktopDropdownMenuButtonClubQuery } from '@//:artifacts/DesktopDropdownMenuButtonClubQuery.graphql'
import DesktopHorizontalNavigationDropdownMenuButton
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/DesktopHorizontalNavigationDropdownMenu/DesktopHorizontalNavigationDropdownMenuButton/DesktopHorizontalNavigationDropdownMenuButton'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'

const Query = graphql`
  query DesktopDropdownMenuButtonClubQuery {
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

export default function DesktopDropdownMenuButtonClub (): JSX.Element {
  const data = useLazyLoadQuery<DesktopDropdownMenuButtonClubQuery>(Query, {})

  if (data.viewer?.clubs?.edges == null || data?.viewer?.clubs?.edges.length < 1) {
    return (
      <DesktopHorizontalNavigationDropdownMenuButton
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
    <DesktopHorizontalNavigationDropdownMenuButton
      href={{
        pathname: '/club/[slug]/home',
        query: { slug: selectedClub.slug }
      }}
      label={selectedClub.name}
    >
      <ClubIcon size='md' clubQuery={selectedClub} />
    </DesktopHorizontalNavigationDropdownMenuButton>
  )
}
