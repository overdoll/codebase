import { graphql, useFragment } from 'react-relay/hooks'
import type { CharacterLinkTileFragment$key } from '@//:artifacts/CharacterLinkTileFragment.graphql'
import { LinkTile } from '../../../../../ContentSelection'
import { LinkTileProps } from '../../../../../ContentSelection/LinkTile/LinkTile'
import { ReactNode } from 'react'

interface Props extends Omit<LinkTileProps, 'href'> {
  query: CharacterLinkTileFragment$key
  children: ReactNode
}

const Fragment = graphql`
  fragment CharacterLinkTileFragment on Character {
    slug
    series {
      slug
    }
    club {
      slug
    }
  }
`

export default function CharacterLinkTile (props: Props): JSX.Element {
  const {
    query,
    children,
    ...rest
  } = props

  const data = useFragment(Fragment, query)

  const decideHref = data?.series == null
    ? {
        pathname: '/[slug]/character/[characterSlug]',
        query: {
          slug: data.club?.slug,
          characterSlug: data.slug
        }
      }
    : {
        pathname: '/search/series/[seriesSlug]/[characterSlug]',
        query: {
          seriesSlug: data.series?.slug,
          characterSlug: data.slug
        }
      }

  return (
    <LinkTile
      {...rest}
      linkProps={{
        prefetch: false
      }}
      href={decideHref}
      overflow='visible'
    >
      {children}
    </LinkTile>
  )
}
