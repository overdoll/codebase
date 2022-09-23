import { graphql, useFragment } from 'react-relay/hooks'
import type { SeriesLinkTileFragment$key } from '@//:artifacts/SeriesLinkTileFragment.graphql'
import { LinkTile } from '../../../../../ContentSelection'
import { LinkTileProps } from '../../../../../ContentSelection/LinkTile/LinkTile'
import { ReactNode } from 'react'

interface Props extends Omit<LinkTileProps, 'href'> {
  query: SeriesLinkTileFragment$key
  children: ReactNode
}

const Fragment = graphql`
  fragment SeriesLinkTileFragment on Series {
    slug
  }
`

export default function SeriesLinkTile (props: Props): JSX.Element {
  const {
    query,
    children,
    ...rest
  } = props

  const data = useFragment(Fragment, query)

  return (
    <LinkTile
      {...rest}
      linkProps={{
        prefetch: false
      }}
      href={{
        pathname: '/search/series/[seriesSlug]',
        query: {
          seriesSlug: data.slug
        }
      }}
      overflow='visible'
    >
      {children}
    </LinkTile>
  )
}
