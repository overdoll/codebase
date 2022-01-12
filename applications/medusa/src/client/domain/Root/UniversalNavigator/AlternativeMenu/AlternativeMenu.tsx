import {
  CogDouble,
  ContentPens,
  LoginKeys,
  PageControllerSettings,
  SafetyExitDoorLeft
} from '@//:assets/icons/navigation'
import HorizontalNavigationDropdownMenu
  from '@//:modules/content/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'
import { RenderOnDesktop } from '@//:modules/content/PageLayout'
import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import { graphql, useFragment } from 'react-relay/hooks'
import QuickAccessButtonProfile from './QuickAccessButtonProfile/QuickAccessButtonProfile'
import DropdownMenuButtonProfile from './DropdownMenuButtonProfile/DropdownMenuButtonProfile'
import Can from '@//:modules/authorization/Can'
import { AlternativeMenuFragment$key } from '@//:artifacts/AlternativeMenuFragment.graphql'
import LanguageManager from './LanguageManager/LanguageManager'
import { MenuDivider, Skeleton } from '@chakra-ui/react'
import { Suspense } from 'react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'

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
        <Can not I='manage' a='Account'>
          <HorizontalNavigation.Button
            to='/join'
            w='42px'
            icon={LoginKeys}
            label={
              <Trans>
                Join
              </Trans>
            }
          />
        </Can>
        <Can I='manage' a='Account'>
          <QuickAccessButtonProfile queryRef={data} />
        </Can>
      </RenderOnDesktop>
      <HorizontalNavigationDropdownMenu
        label={i18n._(t`Alternative Menu`)}
        icon={PageControllerSettings}
      >
        <Can not I='manage' a='Account'>
          <HorizontalNavigationDropdownMenu.Button
            to='/join'
            icon={LoginKeys}
            colorScheme='green'
            label={
              <Trans>
                Join
              </Trans>
            }
          />
        </Can>
        <Can I='manage' a='Account'>
          <DropdownMenuButtonProfile queryRef={data} />
          <HorizontalNavigationDropdownMenu.Button
            to='/manage/posts'
            colorScheme='teal'
            icon={ContentPens}
            label={
              <Trans>
                Manage Content
              </Trans>
            }
          />
          <HorizontalNavigationDropdownMenu.Button
            to='/settings/profile'
            colorScheme='green'
            icon={CogDouble}
            label={
              <Trans>
                Account Settings
              </Trans>
            }
          />
          <HorizontalNavigationDropdownMenu.Button
            to='/logout'
            color='orange.300'
            icon={SafetyExitDoorLeft}
            label={
              <Trans>
                Log Out
              </Trans>
            }
          />
        </Can>
        <MenuDivider mb={1} borderColor='gray.500' borderWidth={2} />
        <Suspense fallback={
          <Skeleton
            borderRadius={5}
            h={12}
          />
        }
        >
          <LanguageManager queryRef={data} />
        </Suspense>
      </HorizontalNavigationDropdownMenu>
    </>
  )
}
