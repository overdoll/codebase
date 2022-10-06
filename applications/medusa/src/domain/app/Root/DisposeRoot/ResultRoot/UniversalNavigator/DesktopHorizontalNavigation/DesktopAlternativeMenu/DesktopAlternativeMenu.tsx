import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import { LoginKeys, PageControllerSettings } from '@//:assets/icons'
import React, { Suspense } from 'react'
import DesktopHorizontalNavigationDropdownMenu
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/DesktopHorizontalNavigationDropdownMenu/DesktopHorizontalNavigationDropdownMenu'
import Can from '@//:modules/authorization/Can'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Icon } from '@//:modules/content/PageLayout'
import QuickAccessButtonProfile from './QuickAccessButtonProfile/QuickAccessButtonProfile'
import DesktopDropdownMenuButtons from './DesktopDropdownMenuButtons/DesktopDropdownMenuButtons'

export default function DesktopAlternativeMenu (): JSX.Element {
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
        <Suspense fallback={<></>}>
          <QuickAccessButtonProfile />
        </Suspense>
      </Can>
      <DesktopHorizontalNavigationDropdownMenu
        label={i18n._(t`Dropdown Menu`)}
        icon={PageControllerSettings}
      >
        <DesktopDropdownMenuButtons />
      </DesktopHorizontalNavigationDropdownMenu>
    </>
  )
}
