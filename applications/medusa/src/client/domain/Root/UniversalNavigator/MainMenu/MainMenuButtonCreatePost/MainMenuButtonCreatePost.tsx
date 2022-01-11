import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import generatePath from '@//:modules/routing/generatePath'
import { ContentBrushPen } from '@//:assets/icons/navigation'
import { AddPlus } from '@//:assets/icons/interface'
import { MainMenuButtonCreatePostQuery } from '@//:artifacts/MainMenuButtonCreatePostQuery.graphql'
import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'

const Query = graphql`
  query MainMenuButtonCreatePostQuery {
    viewer {
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

  if (data.viewer?.clubs?.edges == null || data?.viewer?.clubs?.edges.length < 1) {
    return (
      <HorizontalNavigation.Button
        exact
        colorScheme='teal'
        to='/configure/create-club'
        icon={AddPlus}
        label={
          <Trans>
            Create a Club
          </Trans>
        }
      />
    )
  }

  const selectedClub = data.viewer?.clubs?.edges[0].node

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
      label={
        <Trans>
          Create a Post
        </Trans>
      }
    />
  )
}
