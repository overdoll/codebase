import { createMockEnvironment } from 'relay-test-utils'
import { render, screen, prettyDOM } from '@testing-library/react'
import withProviders from '@//:modules/testing/withProviders'

import Sidebar from '../components/NavigationContents/Sidebar/Sidebar'
import SidebarButton from '../components/NavigationContents/Sidebar/SidebarButton/SidebarButton'
import SidebarGrouping from '../components/NavigationContents/Sidebar/SidebarGrouping/SidebarGrouping'
import NavigationContents from '../components/NavigationContents/NavigationContents'
import PageContents from '../components/NavigationContents/PageContents/PageContents'
import NavigationContainer from '@//:modules/content/Navigation/components/NavigationContainer/NavigationContainer'
import NavigationLeftBrand
  from '@//:modules/content/Navigation/components/NavigationContainer/NavigationLeftBrand/NavigationLeftBrand'
import NavigationCenterItems
  from '@//:modules/content/Navigation/components/NavigationContainer/NavigationCenterItems/NavigationCenterItems'
import NavigationButton
  from '@//:modules/content/Navigation/components/NavigationContainer/NavigationCenterItems/NavigationButton/NavigationButton'
import NavigationRightItems
  from '@//:modules/content/Navigation/components/NavigationContainer/NavigationRightItems/NavigationRightItems'
import MenuItemButton
  from '@//:modules/content/Navigation/components/NavigationContainer/NavigationRightItems/NavigationMenu/MenuItemButton/MenuItemButton'
import NavigationMenu
  from '@//:modules/content/Navigation/components/NavigationContainer/NavigationRightItems/NavigationMenu/NavigationMenu'

const routes = []

const SampleIcon = () => {
  return (
    <svg />
  )
}

const SidebarComponent = () => {
  return (
    <NavigationContents>
      <Sidebar title='sidebar title'>
        <SidebarGrouping label='sidebar grouping'>
          <SidebarButton path='/' title='sidebar path' />
        </SidebarGrouping>
      </Sidebar>
      <PageContents>
        i can see the page contents
      </PageContents>
    </NavigationContents>
  )
}

const NavigationComponent = () => {
  return (
    <NavigationContainer>
      <NavigationLeftBrand>
        left brand
      </NavigationLeftBrand>
      <NavigationCenterItems>
        <NavigationButton icon={SampleIcon} exact={false} label='navigation path' path='/' />
      </NavigationCenterItems>
      <NavigationRightItems>
        <>
          right items
        </>
      </NavigationRightItems>
    </NavigationContainer>
  )
}

const NavigationMenuComponent = () => {
  return (
    <NavigationMenu>
      <MenuItemButton path='/' label='menu path' icon={SampleIcon} />
    </NavigationMenu>
  )
}

it('menu renders', async () => {
  const [Root] = withProviders({
    Component: NavigationMenuComponent,
    environment: createMockEnvironment(),
    routes: routes
  })

  render(
    <Root />
  )

  // Expect the navigation bar brand to exist
  const menuItem = screen.getByText('menu path')
  expect(menuItem).toBeInTheDocument()
})

it('nav bar renders & can see left brand & can see center items & can see right items', async () => {
  const [Root] = withProviders({
    Component: NavigationComponent,
    environment: createMockEnvironment(),
    routes: routes
  })

  render(
    <Root />
  )

  // Expect the navigation bar brand to be visible
  const navBrand = screen.getByText('left brand')
  expect(navBrand).toBeInTheDocument()

  // Expect the navigation button to be visible
  const navButton = screen.getByLabelText('navigation path')
  expect(navButton).toBeVisible()

  // Expect the navigation right items to be visible
  const navMenu = screen.getByText('right items')
  expect(navMenu).toBeVisible()
})

it('sidebar renders & can see groupings & can see sub-item under grouping', async () => {
  const [Root] = withProviders({
    Component: SidebarComponent,
    environment: createMockEnvironment(),
    routes: routes
  })

  render(
    <Root />
  )

  // Expect the sidebar title to be visible
  const sidebarTitle = screen.getByText('sidebar title')
  expect(sidebarTitle).toBeVisible()

  // Expect the sidebar grouping to be visible
  const sidebarGroup = screen.getByText('sidebar grouping')
  expect(sidebarGroup).toBeVisible()

  // Expect the sidebar button to be visible
  const sidebarButton = screen.getByText('sidebar path')
  expect(sidebarButton).toBeVisible()

  // Expect page contents to be visible
  const pageContents = screen.getByText('i can see the page contents')
  expect(pageContents).toBeVisible()
})
