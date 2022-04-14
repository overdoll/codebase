import { Menu } from '@//:modules/content/ThemeComponents/Menu/Menu'
import { graphql, useFragment } from 'react-relay/hooks'
import type { ProfileMenuFragment$key } from '@//:artifacts/ProfileMenuFragment.graphql'
import ProfileStaffButton from './ProfileStaffButton/ProfileStaffButton'
import ProfileCopyLinkButton from './ProfileCopyLinkButton/ProfileCopyLinkButton'

interface Props {
  query: ProfileMenuFragment$key
}

const Fragment = graphql`
  fragment ProfileMenuFragment on Account {
    ...ProfileStaffButtonFragment
    ...ProfileCopyLinkButtonFragment
  }
`

export default function ProfileMenu ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Menu p={1}>
      <ProfileCopyLinkButton query={data} />
      <ProfileStaffButton query={data} />
    </Menu>
  )
}
