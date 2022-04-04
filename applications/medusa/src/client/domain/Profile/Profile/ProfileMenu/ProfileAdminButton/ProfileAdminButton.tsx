import { MenuLinkItem } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { Trans } from '@lingui/macro'
import { LoginKeys } from '@//:assets/icons'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ProfileStaffButtonFragment$key } from '@//:artifacts/ProfileStaffButtonFragment.graphql'
import Can from '@//:modules/authorization/Can'

interface Props {
  query: ProfileStaffButtonFragment$key
}

const Fragment = graphql`
  fragment ProfileStaffButtonFragment on Account {
    username
  }
`

export default function ProfileStaffButton ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Can I='staff' a='Account'>
      <MenuLinkItem
        to={`/staff/account/${data.username}`}
        text={(
          <Trans>
            Staff
          </Trans>)}
        colorScheme='purple'
        icon={LoginKeys}
      />
    </Can>
  )
}
