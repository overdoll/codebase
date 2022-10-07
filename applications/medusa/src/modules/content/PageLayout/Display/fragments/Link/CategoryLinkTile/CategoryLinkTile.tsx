import { graphql, useFragment } from 'react-relay/hooks'
import type { CategoryLinkTileFragment$key } from '@//:artifacts/CategoryLinkTileFragment.graphql'
import { LinkTile } from '../../../../../ContentSelection'
import { LinkTileProps } from '../../../../../ContentSelection/LinkTile/LinkTile'
import { ReactNode } from 'react'

interface Props extends Omit<LinkTileProps, 'href'> {
  query: CategoryLinkTileFragment$key
  children: ReactNode
}

const Fragment = graphql`
  fragment CategoryLinkTileFragment on Category {
    slug
  }
`

export default function CategoryLinkTile (props: Props): JSX.Element {
  const {
    query,
    children,
    ...rest
  } = props

  const data = useFragment(Fragment, query)

  return (
    <LinkTile
      {...rest}
      href={{
        pathname: '/search/category/[slug]',
        query: {
          slug: data.slug
        }
      }}
      overflow='visible'
    >
      {children}
    </LinkTile>
  )
}
