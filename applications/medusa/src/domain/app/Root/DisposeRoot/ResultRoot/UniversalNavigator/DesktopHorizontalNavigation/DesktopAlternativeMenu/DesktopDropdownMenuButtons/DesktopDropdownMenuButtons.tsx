import { Trans } from '@lingui/macro'
import { CogDouble, ContentBrushPen, HeartFull, LoginKeys, SafetyExitDoorLeft, SafetyFloat } from '@//:assets/icons'
import Can from '@//:modules/authorization/Can'
import React, { Suspense } from 'react'
import SkeletonDropdownMenuButton
  from '@//:modules/content/Placeholder/Loading/SkeletonDropdownMenuButton/SkeletonDropdownMenuButton'
import DesktopHorizontalNavigationDropdownMenuButton
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/DesktopHorizontalNavigationDropdownMenu/DesktopHorizontalNavigationDropdownMenuButton/DesktopHorizontalNavigationDropdownMenuButton'
import DesktopDropdownMenuButtonProfile from './DesktopDropdownMenuButtonProfile/DesktopDropdownMenuButtonProfile'
import DesktopDropdownMenuButtonClub from './DesktopDropdownMenuButtonClub/DesktopDropdownMenuButtonClub'
import { useJoin } from '../../../../JoinModal/JoinModal'

export default function DesktopDropdownMenuButtons (): JSX.Element {
  const onJoin = useJoin()

  return (
    <>
      <Can I='create' a='Club'>
        <Suspense fallback={
          <SkeletonDropdownMenuButton />
        }
        >
          <DesktopDropdownMenuButtonClub />
        </Suspense>
      </Can>
      <Can not I='configure' a='Account'>
        <DesktopHorizontalNavigationDropdownMenuButton
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
        <Can not I='create' a='Club'>
          <Suspense fallback={
            <SkeletonDropdownMenuButton />
          }
          >
            <DesktopDropdownMenuButtonProfile />
          </Suspense>
        </Can>
      </Can>
      <Can I='configure' a='Account'>
        <DesktopHorizontalNavigationDropdownMenuButton
          href='/likes'
          icon={HeartFull}
          label={
            <Trans>
              Liked Posts
            </Trans>
          }
        />
      </Can>
      <Can I='staff' a='Entity'>
        <DesktopHorizontalNavigationDropdownMenuButton
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
        <DesktopHorizontalNavigationDropdownMenuButton
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
        <DesktopHorizontalNavigationDropdownMenuButton
          href='/creators'
          icon={ContentBrushPen}
          label={
            <Trans>
              Create a Post
            </Trans>
          }
        />
      </Can>
      <Can I='configure' a='Account'>
        <DesktopHorizontalNavigationDropdownMenuButton
          href='/settings/profile'
          icon={CogDouble}
          label={
            <Trans>
              Account Settings
            </Trans>
          }
        />
      </Can>
      <DesktopHorizontalNavigationDropdownMenuButton
        href='/help'
        icon={SafetyFloat}
        label={
          <Trans>
            Help
          </Trans>
        }
      />
      <Can I='configure' a='Account'>
        <DesktopHorizontalNavigationDropdownMenuButton
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
