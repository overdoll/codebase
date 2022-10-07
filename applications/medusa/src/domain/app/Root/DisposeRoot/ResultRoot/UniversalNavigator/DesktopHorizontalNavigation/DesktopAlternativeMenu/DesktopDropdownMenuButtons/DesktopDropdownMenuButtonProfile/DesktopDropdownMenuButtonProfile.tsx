import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { DesktopDropdownMenuButtonProfileQuery } from '@//:artifacts/DesktopDropdownMenuButtonProfileQuery.graphql'
import { Trans } from '@lingui/macro'
import AccountIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/AccountIcon/AccountIcon'
import DesktopHorizontalNavigationDropdownMenuButton
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/DesktopHorizontalNavigationDropdownMenu/DesktopHorizontalNavigationDropdownMenuButton/DesktopHorizontalNavigationDropdownMenuButton'
import React from 'react'

const Query = graphql`
  query DesktopDropdownMenuButtonProfileQuery {
    viewer {
      username
      ...AccountIconFragment
    }
  }
`

export default function DesktopDropdownMenuButtonProfile (): JSX.Element {
  const data = useLazyLoadQuery<DesktopDropdownMenuButtonProfileQuery>(Query, {})

  if (data.viewer == null) return <></>

  return (
    <DesktopHorizontalNavigationDropdownMenuButton
      href={{
        pathname: '/profile/[username]',
        query: { username: data.viewer.username }
      }}
      label={
        <Trans>
          My Profile
        </Trans>
      }
    >
      <AccountIcon size='md' accountQuery={data.viewer} />
    </DesktopHorizontalNavigationDropdownMenuButton>
  )
}
