/**
 * @flow
 */
import type { Node } from 'react'
import { useMemo } from 'react'
import { Button, useBreakpointValue, Skeleton } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useLocation } from '@//:modules/routing'
import { graphql, useFragment } from 'react-relay/hooks'
import { useAbility } from '@//:modules/utilities/hooks'
import Link from '@//:modules/routing/Link'
import computeCurrentActiveRoutes from './helpers/computeCurrentActiveRoutes'
import { useRelayEnvironment } from 'react-relay'
import type { NavigationFragment$key } from '@//:artifacts/NavigationFragment.graphql'
import getBasePath from './helpers/getBasePath'
import LockedAccountBanner from './content/NavigationContents/PageContents/LockedAccountBanner/LockedAccountBanner'
import { RenderOnMobile, RenderOnDesktop } from '@//:modules/content/PageLayout'
import NavLink from '@//:modules/routing/NavLink'
import { SidebarButton, NavigationButton, MenuButton } from '@//:modules/content/Navigation/components'
import {
  NavigationBarCenter,
  NavigationContents,
  NavigationBar,
  NavigationBarLeft,
  NavigationBarRight,
  PageContents,
  SimplifiedNavigation,
  Sidebar,
  SidebarGrouping,
  SiteLinkLogo
} from '@//:modules/content/Navigation/content'
import {
  SimpleProfileButton,
  LoggedOutPlaceholder,
  SimpleLoginButton,
  LogoutButton,
  NavigationMenu,
  ProfileButton
} from '@//:modules/content/Navigation/content/NavigationBar/NavigationBarRight'

type Props = {
  children: Node,
  query: NavigationFragment$key
}

const NavigationFragmentGQL = graphql`
  fragment NavigationFragment on Account {
    ...SimpleProfileButtonFragment
    ...ProfileButtonFragment
  }
`

export default function Navigation ({ children, query }: Props): Node {
  const data = useFragment(NavigationFragmentGQL, query)

  const [t] = useTranslation('navigation')

  const environment = useRelayEnvironment()

  const location = useLocation()

  const ability = useAbility()

  const display = useBreakpointValue({ base: 'mobile', md: 'desktop' })

  const [navigationTop, navigationMenu, navigationSidebar, navigationFiltered] = useMemo(() => computeCurrentActiveRoutes({
    environment
  }), [ability])

  // Buttons that appear in the expandable Menu at the top right
  const MenuButtons = () => {
    // Buttons that appear regardless of the user type, such as language swapping
    const UniversalButtons = () => <></>

    // If layout is mobile, extra buttons will be condensed to the Menu so
    // the navigation bar isn't overcrowded
    const CondensedButtons = () => {
      if (display === 'mobile') {
        return navigationTop.slice(3).map((item, index) =>
          <NavLink key={index} exact={item.exact} to={item.path}>
            {({ isActiveBasePath }) => (
              <MenuButton
                active={isActiveBasePath}
                label={t(item.navigation.title)}
                icon={item.navigation.icon}
              />
            )}
          </NavLink>)
      }

      return <></>
    }

    if (ability.can('manage', 'account')) {
      return (
        <>
          {!ability.can('read', 'locked') &&
            <ProfileButton query={data} />}
          <CondensedButtons />
          {navigationMenu.map((item, index) => {
            return (
              <NavLink key={index} exact={item.exact} to={item.path}>
                {({ isActiveBasePath }) => (
                  <MenuButton
                    active={isActiveBasePath}
                    label={t(item.navigation.title)}
                    icon={item.navigation.icon}
                  />
                )}
              </NavLink>
            )
          })}
          <UniversalButtons />
          <LogoutButton />
        </>
      )
    }
    return (
      <>
        <LoggedOutPlaceholder />
        <UniversalButtons />
      </>
    )
  }

  // Buttons that appear at the top of the navigation
  const NavigationButtons = () => {
    const NavigationButtonSkeleton = () =>
      <Skeleton
        startColor='gray.600'
        w='58px' h={{ base: '48px', md: '38px' }}
        borderRadius={{ base: 2, md: 10 }}
      />

    if (!display) {
      return (
        <>
          <NavigationButtonSkeleton />
          <NavigationButtonSkeleton />
          <NavigationButtonSkeleton />
        </>
      )
    }

    // For simplifying the buttons when on mobile to avoid overcrowding
    const navigationButtons = () => {
      if (display === 'mobile') return navigationTop.slice(0, 3)
      return navigationTop
    }

    return (
      <>
        {navigationButtons().map((item, index) =>
          <NavLink key={index} exact={item.exact} to={item.path}>
            {({ isActiveBasePath }) => (
              <NavigationButton
                active={isActiveBasePath}
                icon={item.navigation.icon}
                label={t(item.navigation.title)}
              />
            )}
          </NavLink>)}
        {display === 'mobile' &&
          <>
            <NavigationMenu>
              <MenuButtons />
            </NavigationMenu>
          </>}
      </>
    )
  }

  // All the sidebar buttons as well as their groupings
  const SidebarButtons = (group) => {
    return Object.keys(group.routes).map((grouping, groupingIndex) =>
      <SidebarGrouping key={groupingIndex} label={grouping}>
        {(group.routes[grouping]).map((sidebarItem, sidebarItemIndex) =>
          <NavLink key={sidebarItemIndex} to={sidebarItem.path}>
            {({ isActive }) => (
              <SidebarButton
                active={isActive}
                icon={sidebarItem.navigation.icon}
                title={t(sidebarItem.navigation.title)}
              />
            )}
          </NavLink>
        )}
      </SidebarGrouping>
    )
  }

  // A component to display the quick access buttons on desktop
  const QuickAccessHandler = () => {
    const NavigationButtonSkeleton = () =>
      <Skeleton
        startColor='gray.600'
        w='42px' h='42px'
        borderRadius='md'
      />

    if (!display) {
      return (
        <>
          <NavigationButtonSkeleton />
          <NavigationButtonSkeleton />
          <NavigationButtonSkeleton />
        </>
      )
    }

    const QuickAccessButtons = () => {
      if (ability.can('manage', 'account')) {
        return <SimpleProfileButton query={data} />
      }

      return <SimpleLoginButton />
    }

    if (display === 'desktop') {
      return (
        <>
          <QuickAccessButtons />
          <NavigationMenu>
            <MenuButtons />
          </NavigationMenu>
        </>
      )
    }

    return <></>
  }

  // A banner that can be displayed for the user to see as soon as they log in
  const BannerHandler = () => {
    if (ability.can('read', 'locked') && getBasePath(location.pathname) !== '/locked') {
      return <LockedAccountBanner />
    }

    return <></>
  }

  // Show a simplified navigation bar if on a filtered route like the login page
  if (navigationFiltered.includes(getBasePath(location.pathname))) {
    return (
      <>
        <BannerHandler />
        <SimplifiedNavigation>
          <PageContents>
            {children}
          </PageContents>
        </SimplifiedNavigation>
      </>
    )
  }

  // The main navigation bar with all the relevant components
  return (
    <>
      <NavigationBar>
        <NavigationBarLeft>
          <SiteLinkLogo />
        </NavigationBarLeft>
        <NavigationBarCenter>
          <NavigationButtons />
        </NavigationBarCenter>
        <NavigationBarRight>
          <QuickAccessHandler />
        </NavigationBarRight>
      </NavigationBar>
      <NavigationContents>
        <RenderOnMobile>
          <BannerHandler />
        </RenderOnMobile>
        {navigationSidebar.map((item, index) => {
          if (getBasePath(location.pathname) !== item.path) {
            return null
          }
          return (
            <Sidebar key={index} title={t(item.navigation.title)}>
              {SidebarButtons(item)}
            </Sidebar>
          )
        })}
        <PageContents>
          <RenderOnDesktop>
            <BannerHandler />
          </RenderOnDesktop>
          {children}
        </PageContents>
      </NavigationContents>
    </>
  )
}
