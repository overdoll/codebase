import { graphql, useFragment } from 'react-relay/hooks'
import { ClubMemberTileFragment$key } from '@//:artifacts/ClubMemberTileFragment.graphql'
import { GridTile, LinkTile } from '@//:modules/content/ContentSelection'
import AccountTileOverlay from '@//:modules/content/ContentSelection/TileOverlay/AccountTileOverlay/AccountTileOverlay'

interface Props {
  query: ClubMemberTileFragment$key
}

const Fragment = graphql`
  fragment ClubMemberTileFragment on ClubMember {
    account {
      username
      isDeleted
      ...AccountTileOverlayFragment
    }
  }
`

export default function ClubMemberTile ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data.account.isDeleted) {
    return (
      <GridTile>
        <AccountTileOverlay query={data.account} />
      </GridTile>
    )
  }

  return (
    <GridTile>
      <LinkTile href={{
        pathname: '/profile/[username]',
        query: { username: data.account.username }
      }}
      >
        <AccountTileOverlay query={data.account} />
      </LinkTile>
    </GridTile>
  )
}
