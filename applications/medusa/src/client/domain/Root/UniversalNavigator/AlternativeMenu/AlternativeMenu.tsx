import { CogDouble, LoginKeys, PageControllerSettings } from '@//:assets/icons/navigation'
import HorizontalNavigationDropdownMenu
  from '@//:modules/content/HorizontalNavigation/HorizontalNavigationDropdownMenu/HorizontalNavigationDropdownMenu'
import { RenderOnDesktop, RenderOnMobile } from '@//:modules/content/PageLayout'
import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import { graphql, useFragment } from 'react-relay/hooks'
import QuickAccessButtonProfile from './QuickAccessButtonProfile/QuickAccessButtonProfile'
import DropdownMenuButtonProfile from './DropdownMenuButtonProfile/DropdownMenuButtonProfile'
import DropdownMenuButtonLogout from './DropdownMenuButtonLogout/DropdownMenuButtonLogout'
import Can from '@//:modules/authorization/Can'
import { AlternativeMenuFragment$key } from '@//:artifacts/AlternativeMenuFragment.graphql'
import LanguageManager from './LanguageManager/LanguageManager'
import { Box, MenuDivider } from '@chakra-ui/react'
import { Suspense } from 'react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import DropdownMenuButtonClub from './DropdownMenuButtonClub/DropdownMenuButtonClub'
import SkeletonDropdownMenuButton
  from '@//:modules/content/Skeleton/SkeletonDropdownMenuButton/SkeletonDropdownMenuButton'

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
        label={i18n._(t`Menu`)}
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
        </Can>
        <Can I='moderate' a='Post'>
          <HorizontalNavigationDropdownMenu.Button
            to='/moderation/queue'
            colorScheme='purple'
            icon={LoginKeys}
            label={
              <Trans>
                Content Moderation
              </Trans>
            }
          />
        </Can>
        <Can I='manage' a='Account'>
          <Suspense fallback={
            <SkeletonDropdownMenuButton />
          }
          >
            <DropdownMenuButtonClub />
          </Suspense>
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
          <DropdownMenuButtonLogout />
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
          <MenuDivider mb={1} borderColor='gray.500' borderWidth={2} />
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
