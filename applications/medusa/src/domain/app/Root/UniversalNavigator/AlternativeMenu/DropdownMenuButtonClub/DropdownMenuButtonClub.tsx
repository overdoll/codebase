import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import HorizontalNavigationDropdownMenu
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'
import { Trans } from '@lingui/macro'
import { ClubPeopleGroup } from '@//:assets/icons/navigation'
import { AddPlus } from '@//:assets/icons/interface'
import { DropdownMenuButtonClubQuery } from '@//:artifacts/DropdownMenuButtonClubQuery.graphql'

const Query = graphql`
  query DropdownMenuButtonClubQuery {
    viewer {
      clubs(first: 1) {
        edges {
          node {
            name
            slug
          }
        }
      }
    }
  }
`

export default function DropdownMenuButtonClub (): JSX.Element {
  const data = useLazyLoadQuery<DropdownMenuButtonClubQuery>(Query, {})

  if (data.viewer?.clubs?.edges == null || data?.viewer?.clubs?.edges.length < 1) {
    return (
      <HorizontalNavigationDropdownMenu.Button
        href='/clubs/create-club'
        colorScheme='teal'
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
    <HorizontalNavigationDropdownMenu.Button
      href={{
        pathname: '/club/[slug]/home',
        query: { slug: selectedClub.slug }
      }}
      colorScheme='teal'
      icon={ClubPeopleGroup}
      label={selectedClub.name}
    />
  )
}
