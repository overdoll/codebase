import { useLingui } from '@lingui/react'
import { t, Trans } from '@lingui/macro'
import { PageControllerSettings } from '@//:assets/icons'
import React, { Suspense } from 'react'
import DesktopHorizontalNavigationDropdownMenu
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/DesktopHorizontalNavigationDropdownMenu/DesktopHorizontalNavigationDropdownMenu'
import Can from '@//:modules/authorization/Can'

import DesktopDropdownMenuButtons from './DesktopDropdownMenuButtons/DesktopDropdownMenuButtons'
import { useJoin } from '../../../JoinModal/JoinModal'
import Button from '@//:modules/form/Button/Button'
import QuickAccessButtons from './QuickAccessButtons/QuickAccessButtons'

export default function DesktopAlternativeMenu (): JSX.Element {
  const { i18n } = useLingui()

  const onJoin = useJoin()

  return (
    <>
      <Can not I='configure' a='Account'>
        <Button
          ml={1}
          borderRadius='lg'
          colorScheme='primary'
          onClick={onJoin}
        >
          <Trans>
            Join
          </Trans>
        </Button>
      </Can>
      <Can I='configure' a='Account'>
        <Suspense fallback={<></>}>
          <QuickAccessButtons />
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
