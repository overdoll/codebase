import { MenuLinkItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { Trans } from '@lingui/macro'
import { UserHuman } from '@//:assets/icons'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ProfilePageButtonFragment$key } from '@//:artifacts/ProfilePageButtonFragment.graphql'

interface Props {
  query: ProfilePageButtonFragment$key
}

const Fragment = graphql`
  fragment ProfilePageButtonFragment on Account {
    username
  }
`

export default function ProfilePageButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <MenuLinkItem
      href={{
        pathname: '/profile/[username]',
        query: { username: data.username }
      }}
      text={(
        <Trans>
          Public Profile
        </Trans>)}
      icon={UserHuman}
    />
  )
}
