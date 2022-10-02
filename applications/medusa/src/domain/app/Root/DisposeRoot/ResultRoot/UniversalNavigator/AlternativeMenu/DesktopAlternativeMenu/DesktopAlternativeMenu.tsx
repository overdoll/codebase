import { graphql, useFragment } from 'react-relay/hooks'
import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import { LoginKeys, PageControllerSettings } from '@//:assets/icons'
import DropdownMenuButtons from '../DropdownMenuButtons/DropdownMenuButtons'
import React from 'react'
import { DesktopAlternativeMenuFragment$key } from '@//:artifacts/DesktopAlternativeMenuFragment.graphql'
import DesktopHorizontalNavigationDropdownMenu
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/DesktopHorizontalNavigationDropdownMenu/DesktopHorizontalNavigationDropdownMenu'
import Can from '@//:modules/authorization/Can'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Icon } from '@//:modules/content/PageLayout'
import QuickAccessButtonProfile from '../QuickAccessButtonProfile/QuickAccessButtonProfile'

interface Props {
  query: DesktopAlternativeMenuFragment$key | null
}

const Fragment = graphql`
  fragment DesktopAlternativeMenuFragment on Account {
    ...DropdownMenuButtonsFragment
    ...QuickAccessButtonProfileFragment
  }
`

export default function DesktopAlternativeMenu (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const { i18n } = useLingui()

  return (
    <>
      <Can not I='configure' a='Account'>
        <LinkButton
          ml={1}
          borderRadius='lg'
          colorScheme='primary'
          leftIcon={<Icon icon={LoginKeys} w={4} h={4} fill='primary.900' />}
          href='/join'
        >
          <Trans>
            Join
          </Trans>
        </LinkButton>
      </Can>
      <Can I='configure' a='Account'>
        <QuickAccessButtonProfile queryRef={data} />
      </Can>
      <DesktopHorizontalNavigationDropdownMenu
        label={i18n._(t`Dropdown Menu`)}
        icon={PageControllerSettings}
      >
        <DropdownMenuButtons query={data} />
      </DesktopHorizontalNavigationDropdownMenu>
    </>
  )
}
