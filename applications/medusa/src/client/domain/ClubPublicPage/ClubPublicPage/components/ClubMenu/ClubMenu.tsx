import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ClubMenuFragment$key } from '@//:artifacts/ClubMenuFragment.graphql'
import Can from '@//:modules/authorization/Can'
import ClubAdminButton from './ClubAdminButton/ClubAdminButton'
import ClubCopyLinkButton from './ClubCopyLinkButton/ClubCopyLinkButton'

interface Props {
  query: ClubMenuFragment$key
}

const Fragment = graphql`
  fragment ClubMenuFragment on Club {
    ...ClubAdminButtonFragment
    ...ClubCopyLinkButtonFragment
  }
`

export default function ClubMenu ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Can I='interact' a='Club' passThrough>
      {allowed => (
        <Menu
          variant='ghost'
          isDisabled={allowed === false}
        >
          <ClubCopyLinkButton query={data} />
          <ClubAdminButton query={data} />
        </Menu>)}
    </Can>
  )
}
