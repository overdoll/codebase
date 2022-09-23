import { Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { PostViewButtonFragment$key } from '@//:artifacts/PostViewButtonFragment.graphql'

import { useFragment } from 'react-relay/hooks'
import { MenuLinkItem } from '../../../../../../ThemeComponents/Menu/Menu'
import { FileMultiple } from '@//:assets/icons'

interface Props {
  query: PostViewButtonFragment$key
}

const Fragment = graphql`
  fragment PostViewButtonFragment on Post {
    reference
    club {
      slug
    }
  }
`

export default function PostViewButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <MenuLinkItem
      href={{
        pathname: '/[slug]/post/[reference]',
        query: {
          slug: data.club.slug,
          reference: data.reference
        }
      }}
      text={(
        <Trans>
          View Post
        </Trans>)}
      icon={FileMultiple}
    />
  )
}
