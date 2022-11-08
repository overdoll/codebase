import { Trans } from '@lingui/macro'
import { graphql } from 'react-relay'
import { PostEditButtonFragment$key } from '@//:artifacts/PostEditButtonFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { MenuLinkItem } from '../../../../../../ThemeComponents/Menu/Menu'
import { ContentBrushPen } from '@//:assets/icons'

interface Props {
  query: PostEditButtonFragment$key
}

const Fragment = graphql`
  fragment PostEditButtonFragment on Post {
    reference
    club {
      slug
    }
  }
`

export default function PostEditButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <MenuLinkItem
      href={{
        pathname: '/club/[slug]/create-post',
        query: {
          slug: data.club.slug,
          post: data.reference
        }
      }}
      text={(
        <Trans>
          Edit Post
        </Trans>)}
      icon={ContentBrushPen}
    />
  )
}
