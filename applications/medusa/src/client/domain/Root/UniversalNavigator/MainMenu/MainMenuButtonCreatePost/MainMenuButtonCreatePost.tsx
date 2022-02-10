import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { t } from '@lingui/macro'
import generatePath from '@//:modules/routing/generatePath'
import { ContentBrushPen } from '@//:assets/icons/navigation'
import { AddPlus } from '@//:assets/icons/interface'
import { MainMenuButtonCreatePostQuery } from '@//:artifacts/MainMenuButtonCreatePostQuery.graphql'
import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import { useLingui } from '@lingui/react'

const Query = graphql`
  query MainMenuButtonCreatePostQuery {
    viewer {
      clubsCount
      clubs(first: 1) {
        edges {
          node {
            slug
          }
        }
      }
    }
  }
`

export default function MainMenuButtonCreatePost (): JSX.Element {
  const data = useLazyLoadQuery<MainMenuButtonCreatePostQuery>(Query, {})

  const { i18n } = useLingui()

  if (data.viewer == null || data.viewer.clubsCount < 1 || data?.viewer?.clubs?.edges.length < 1 || data?.viewer?.clubs == null) {
    return (
      <HorizontalNavigation.Button
        exact
        colorScheme='teal'
        to='/configure/create-club'
        icon={AddPlus}
        label={i18n._(t`Create a Club`)}
      />
    )
  }

  const selectedClub = data.viewer?.clubs?.edges[0]?.node

  const newPath = generatePath('/club/:slug/:entity', {
    slug: selectedClub.slug,
    entity: 'create-post'
  })

  return (
    <HorizontalNavigation.Button
      exact
      colorScheme='teal'
      to={newPath}
      icon={ContentBrushPen}
      label={i18n._(t`Create a Post`)}
    />
  )
}
