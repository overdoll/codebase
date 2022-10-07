import { Trans } from '@lingui/macro'
import { CogDouble, ContentBrushPen, LoginKeys, SafetyExitDoorLeft, SafetyFloat } from '@//:assets/icons'
import Can from '@//:modules/authorization/Can'
import React, { Suspense } from 'react'
import SkeletonDropdownMenuButton
  from '@//:modules/content/Placeholder/Loading/SkeletonDropdownMenuButton/SkeletonDropdownMenuButton'
import MobileHorizontalNavigationDropdownMenuButton
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/MobileHorizontalNavigationDropdownMenu/MobileHorizontalNavigationDropdownMenuButton/MobileHorizontalNavigationDropdownMenuButton'
import MobileDropdownMenuButtonClub from './MobileDropdownMenuButtonClub/MobileDropdownMenuButtonClub'
import MobileDropdownMenuButtonProfile from './MobileDropdownMenuButtonProfile/MobileDropdownMenuButtonProfile'
import { useJoin } from '../../../../JoinModal/JoinModal'

export default function MobileDropdownMenuButtons (): JSX.Element {
  const onJoin = useJoin()

  return (
    <>
      <Can not I='configure' a='Account'>
        <MobileHorizontalNavigationDropdownMenuButton
          onClick={onJoin}
          icon={LoginKeys}
          label={
            <Trans>
              Join
            </Trans>
          }
        />
      </Can>
      <Can I='configure' a='Account'>
        <Suspense fallback={
          <SkeletonDropdownMenuButton />
        }
        >
          <MobileDropdownMenuButtonProfile />
        </Suspense>
      </Can>
      <Can I='staff' a='Entity'>
        <MobileHorizontalNavigationDropdownMenuButton
          href='/staff/entity'
          icon={LoginKeys}
          label={
            <Trans>
              Platform Staff
            </Trans>
          }
        />
      </Can>
      <Can I='moderate' a='Post'>
        <MobileHorizontalNavigationDropdownMenuButton
          href='/moderation/post-queue'
          icon={LoginKeys}
          label={
            <Trans>
              Content Moderation
            </Trans>
          }
        />
      </Can>
      <Can not I='create' a='Club'>
        <MobileHorizontalNavigationDropdownMenuButton
          href='/artists'
          icon={ContentBrushPen}
          label={
            <Trans>
              Create a Post
            </Trans>
          }
        />
      </Can>
      <Can I='create' a='Club'>
        <Suspense fallback={
          <SkeletonDropdownMenuButton />
        }
        >
          <MobileDropdownMenuButtonClub />
        </Suspense>
      </Can>
      <Can I='configure' a='Account'>
        <MobileHorizontalNavigationDropdownMenuButton
          href='/settings/profile'
          icon={CogDouble}
          label={
            <Trans>
              Account Settings
            </Trans>
          }
        />
      </Can>
      <MobileHorizontalNavigationDropdownMenuButton
        href='/help'
        icon={SafetyFloat}
        label={
          <Trans>
            Help
          </Trans>
        }
      />
      <Can I='configure' a='Account'>
        <MobileHorizontalNavigationDropdownMenuButton
          href='/logout'
          icon={SafetyExitDoorLeft}
          label={
            <Trans>
              Log Out
            </Trans>
          }
        />
      </Can>
    </>
  )
}
