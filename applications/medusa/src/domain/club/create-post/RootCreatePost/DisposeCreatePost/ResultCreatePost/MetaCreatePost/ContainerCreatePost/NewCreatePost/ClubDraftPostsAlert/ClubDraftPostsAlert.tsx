import { ClubDraftPostsAlertFragment$key } from '@//:artifacts/ClubDraftPostsAlertFragment.graphql'
import { graphql, useFragment } from 'react-relay/hooks'
import { FileMultiple } from '@//:assets/icons'
import { Trans } from '@lingui/macro'
import { LinkTile } from '@//:modules/content/ContentSelection'
import InspectableAlert from '@//:common/components/InspectableAlert/InspectableAlert'

interface Props {
  query: ClubDraftPostsAlertFragment$key
}

const Fragment = graphql`
  fragment ClubDraftPostsAlertFragment on Club {
    slug
    draftPosts: posts(first: 1, state: DRAFT) {
      edges {
        node {
          __typename
        }
      }
    }
  }
`

export default function ClubDraftPostsAlert ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const hasDraftPosts = data.draftPosts.edges.length > 0

  if (!hasDraftPosts) {
    return <></>
  }

  return (
    <LinkTile href={{
      pathname: '/club/[slug]/posts',
      query: {
        slug: data.slug,
        state: 'DRAFT'
      }
    }}
    >
      <InspectableAlert
        text={<Trans>You have unpublished draft posts</Trans>}
        icon={FileMultiple}
        colorScheme='orange'
      />
    </LinkTile>
  )
}
