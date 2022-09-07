import {
  CogDouble,
  ContentBrushPen,
  LoginKeys,
  PageControllerSettings,
  SafetyExitDoorLeft,
  SafetyFloat
} from '@//:assets/icons'
import HorizontalNavigationDropdownMenu
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'
import { Icon, RenderOnDesktop } from '@//:modules/content/PageLayout'
import { graphql, useFragment } from 'react-relay/hooks'
import QuickAccessButtonProfile from './QuickAccessButtonProfile/QuickAccessButtonProfile'
import DropdownMenuButtonProfile from './DropdownMenuButtonProfile/DropdownMenuButtonProfile'
import Can from '@//:modules/authorization/Can'
import { AlternativeMenuFragment$key } from '@//:artifacts/AlternativeMenuFragment.graphql'
import React, { Suspense } from 'react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import DropdownMenuButtonClub from './DropdownMenuButtonClub/DropdownMenuButtonClub'
import SkeletonDropdownMenuButton
  from '@//:modules/content/Placeholder/Loading/SkeletonDropdownMenuButton/SkeletonDropdownMenuButton'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import DropdownMenuButtonInstallApp from './DropdownMenuButtonInstallApp/DropdownMenuButtonInstallApp'
import DropdownMenuSocialLinks from './DropdownMenuSocialLinks/DropdownMenuSocialLinks'

interface Props {
  queryRef: AlternativeMenuFragment$key | null
}

const AlternativeMenuGQL = graphql`
  fragment AlternativeMenuFragment on Account {
    ...DropdownMenuButtonProfileFragment
    ...QuickAccessButtonProfileFragment
  }
`

export default function AlternativeMenu ({ queryRef }: Props): JSX.Element {
  const data = useFragment(AlternativeMenuGQL, queryRef)

  const { i18n } = useLingui()

  return (
    <>
      <RenderOnDesktop>
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
      </RenderOnDesktop>
      <HorizontalNavigationDropdownMenu
        label={i18n._(t`Dropdown Menu`)}
        icon={PageControllerSettings}
      >
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
      </HorizontalNavigationDropdownMenu>
    </>
  )
}
