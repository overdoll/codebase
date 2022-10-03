import { graphql, useFragment } from 'react-relay/hooks'
import { Trans } from '@lingui/macro'
import { CogDouble, ContentBrushPen, LoginKeys, SafetyExitDoorLeft, SafetyFloat } from '@//:assets/icons'
import Can from '@//:modules/authorization/Can'
import HorizontalNavigationDropdownMenu
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'
import DropdownMenuButtonProfile from './DropdownMenuButtonProfile/DropdownMenuButtonProfile'
import DropdownMenuButtonInstallApp from './DropdownMenuButtonInstallApp/DropdownMenuButtonInstallApp'
import React, { Suspense } from 'react'
import SkeletonDropdownMenuButton
  from '@//:modules/content/Placeholder/Loading/SkeletonDropdownMenuButton/SkeletonDropdownMenuButton'
import DropdownMenuButtonClub from './DropdownMenuButtonClub/DropdownMenuButtonClub'
import DropdownMenuSocialLinks from './DropdownMenuSocialLinks/DropdownMenuSocialLinks'
import { DropdownMenuButtonsFragment$key } from '@//:artifacts/DropdownMenuButtonsFragment.graphql'

interface Props {
  query: DropdownMenuButtonsFragment$key | null
}

const Fragment = graphql`
  fragment DropdownMenuButtonsFragment on Account {
    ...DropdownMenuButtonProfileFragment
    ...QuickAccessButtonProfileFragment
  }
`

export default function DropdownMenuButtons (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  return (
    <>
      <Can not I='configure' a='Account'>
        <HorizontalNavigationDropdownMenu.Button
          href='/join'
          icon={LoginKeys}
          colorScheme='primary'
          label={
            <Trans>
              Join
            </Trans>
          }
        />
      </Can>
      <Can I='configure' a='Account'>
        <DropdownMenuButtonProfile queryRef={data} />
      </Can>
      <Can I='staff' a='Entity'>
        <HorizontalNavigationDropdownMenu.Button
          href='/staff/entity'
          colorScheme='purple'
          icon={LoginKeys}
          label={
            <Trans>
              Platform Staff
            </Trans>
          }
        />
      </Can>
      <Can I='moderate' a='Post'>
        <HorizontalNavigationDropdownMenu.Button
          href='/moderation/post-queue'
          colorScheme='purple'
          icon={LoginKeys}
          label={
            <Trans>
              Content Moderation
            </Trans>
          }
        />
      </Can>
      <DropdownMenuButtonInstallApp />
      <Can not I='create' a='Club'>
        <HorizontalNavigationDropdownMenu.Button
          href='/artists'
          colorScheme='primary'
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
          <DropdownMenuButtonClub />
        </Suspense>
      </Can>
      <Can I='configure' a='Account'>
        <HorizontalNavigationDropdownMenu.Button
          href='/settings/profile'
          colorScheme='green'
          icon={CogDouble}
          label={
            <Trans>
              Account Settings
            </Trans>
          }
        />
      </Can>
      <HorizontalNavigationDropdownMenu.Button
        href='/help'
        colorScheme='primary'
        icon={SafetyFloat}
        label={
          <Trans>
            Help
          </Trans>
        }
      />
      <Can I='configure' a='Account'>
        <HorizontalNavigationDropdownMenu.Button
          href='/logout'
          color='orange.300'
          icon={SafetyExitDoorLeft}
          label={
            <Trans>
              Log Out
            </Trans>
          }
        />
      </Can>
      <DropdownMenuSocialLinks />
    </>
  )
}
