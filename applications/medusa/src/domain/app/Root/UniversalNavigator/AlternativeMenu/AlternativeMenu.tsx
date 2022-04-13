import {
  CogDouble,
  LoginKeys,
  PageControllerSettings,
  SafetyExitDoorLeft,
  SafetyFloat
} from '@//:assets/icons/navigation'
import HorizontalNavigationDropdownMenu
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'
import { RenderOnDesktop, RenderOnMobile } from '@//:modules/content/PageLayout'
import HorizontalNavigation from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigation'
import { graphql, useFragment } from 'react-relay/hooks'
import QuickAccessButtonProfile from './QuickAccessButtonProfile/QuickAccessButtonProfile'
import DropdownMenuButtonProfile from './DropdownMenuButtonProfile/DropdownMenuButtonProfile'
import Can from '@//:modules/authorization/Can'
import { AlternativeMenuFragment$key } from '@//:artifacts/AlternativeMenuFragment.graphql'
import LanguageManager from './LanguageManager/LanguageManager'
import { Box } from '@chakra-ui/react'
import { Suspense } from 'react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import DropdownMenuButtonClub from './DropdownMenuButtonClub/DropdownMenuButtonClub'
import SkeletonDropdownMenuButton
  from '@//:modules/content/Placeholder/Loading/SkeletonDropdownMenuButton/SkeletonDropdownMenuButton'

interface Props {
  queryRef: AlternativeMenuFragment$key | null
}

const AlternativeMenuGQL = graphql`
  fragment AlternativeMenuFragment on Account {
    ...DropdownMenuButtonProfileFragment
    ...QuickAccessButtonProfileFragment
    ...LanguageManagerFragment
  }
`

export default function AlternativeMenu ({ queryRef }: Props): JSX.Element {
  const data = useFragment(AlternativeMenuGQL, queryRef)

  const { i18n } = useLingui()

  return (
    <>
      <RenderOnDesktop>
        <Can not I='configure' a='Account'>
          <HorizontalNavigation.Button
            href='/join'
            icon={LoginKeys}
            label={
              <Trans>
                Join
              </Trans>
            }
          />
        </Can>
        <Can I='configure' a='Account'>
          <QuickAccessButtonProfile queryRef={data} />
        </Can>
        <HorizontalNavigation.Button
          href='/help'
          icon={SafetyFloat}
          label={
            <Trans>
              Help
            </Trans>
          }
        />
      </RenderOnDesktop>
      <HorizontalNavigationDropdownMenu
        label={i18n._(t`Dropdown Menu`)}
        icon={PageControllerSettings}
      >
        <Can not I='configure' a='Account'>
          <HorizontalNavigationDropdownMenu.Button
            href='/join'
            icon={LoginKeys}
            colorScheme='green'
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
        <Can I='staff' a='Tags'>
          <HorizontalNavigationDropdownMenu.Button
            href='/staff'
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
            href='/moderation/queue'
            colorScheme='purple'
            icon={LoginKeys}
            label={
              <Trans>
                Content Moderation
              </Trans>
            }
          />
        </Can>
        <Can I='configure' a='Account'>
          <Suspense fallback={
            <SkeletonDropdownMenuButton />
          }
          >
            <DropdownMenuButtonClub />
          </Suspense>
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
        <RenderOnMobile>
          <Suspense fallback={
            <SkeletonDropdownMenuButton />
          }
          >
            <Box>
              <LanguageManager queryRef={data} />
            </Box>
          </Suspense>
        </RenderOnMobile>
        <RenderOnDesktop>
          <Suspense fallback={
            <SkeletonDropdownMenuButton />
          }
          >
            <LanguageManager queryRef={data} />
          </Suspense>
        </RenderOnDesktop>
      </HorizontalNavigationDropdownMenu>
    </>
  )
}
