import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubMenuFragment$key } from '@//:artifacts/ClubMenuFragment.graphql'
import Can from '@//:modules/authorization/Can'
import ClubStaffButton from './ClubStaffButton/ClubStaffButton'
import ClubCopyLinkButton from './ClubCopyLinkButton/ClubCopyLinkButton'
import ClubManageButton from './ClubManageButton/ClubManageButton'

interface Props {
  query: ClubMenuFragment$key
}

const Fragment = graphql`
  fragment ClubMenuFragment on Club {
    ...ClubStaffButtonFragment
    ...ClubCopyLinkButtonFragment
    ...ClubManageButtonFragment
  }
`

export default function ClubMenu ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Can I='interact' a='Club' passThrough>
      {allowed => (
        <Menu
          p={1}
          isDisabled={allowed === false}
        >
          <ClubCopyLinkButton query={data} />
          <ClubManageButton query={data} />
          <ClubStaffButton query={data} />
        </Menu>)}
    </Can>
  )
}
