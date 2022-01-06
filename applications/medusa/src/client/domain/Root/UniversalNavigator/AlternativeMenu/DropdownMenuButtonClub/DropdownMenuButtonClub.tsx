import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import HorizontalNavigationDropdownMenu
  from '@//:modules/content/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'
import { Trans } from '@lingui/macro'
import generatePath from '@//:modules/routing/generatePath'
import { SettingHammer } from '@//:assets/icons/navigation'
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

  if (data.viewer?.clubs?.edges == null) {
    return (
      <HorizontalNavigationDropdownMenu.Button
        to='/configure/create-club'
        colorScheme='teal'
        icon={AddPlus}
        label={
          <Trans>
            Create a club
          </Trans>
        }
      />
    )
  }

  const selectedClub = data.viewer?.clubs.edges[0].node

  const newPath = generatePath('/club/:slug/:entity', {
    slug: selectedClub.slug,
    entity: 'home'
  })

  return (
    <HorizontalNavigationDropdownMenu.Button
      to={newPath}
      colorScheme='teal'
      icon={SettingHammer}
      label={
        <Trans>
          My Club {selectedClub.name}
        </Trans>
      }
    />
  )
}
