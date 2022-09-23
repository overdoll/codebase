import { graphql, useFragment } from 'react-relay/hooks'
import type { PostLinkTileFragment$key } from '@//:artifacts/PostLinkTileFragment.graphql'
import { LinkTile } from '../../../../../ContentSelection'
import { LinkTileProps } from '../../../../../ContentSelection/LinkTile/LinkTile'
import { ReactNode } from 'react'

interface Props extends Omit<LinkTileProps, 'href'> {
  query: PostLinkTileFragment$key
  children: ReactNode
}

const Fragment = graphql`
  fragment PostLinkTileFragment on Post {
    reference
    club {
      slug
    }
  }
`

export default function PostLinkTile (props: Props): JSX.Element {
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
        pathname: '/[slug]/post/[reference]',
        query: {
          slug: data.club.slug,
          reference: data.reference
        }
      }}
      overflow='visible'
    >
      {children}
    </LinkTile>
  )
}
