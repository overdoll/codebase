import { createMockEnvironment } from 'relay-test-utils'
import { render, screen } from '@testing-library/react'
import withProviders from '@//:modules/testing/withProviders'

import Sidebar from '../content/NavigationContents/Sidebar/Sidebar'
import SidebarButton from '../components/SidebarButton/SidebarButton'
import SidebarGrouping from '../content/NavigationContents/Sidebar/SidebarGrouping/SidebarGrouping'
import NavigationContents from '../content/NavigationContents/NavigationContents'
import PageContents from '../content/NavigationContents/PageContents/PageContents'
import NavigationBar from '@//:modules/content/Navigation/content/NavigationBar/NavigationBar'
import NavigationBarLeft from '@//:modules/content/Navigation/content/NavigationBar/NavigationBarLeft/NavigationBarLeft'
import NavigationBarCenter
  from '@//:modules/content/Navigation/content/NavigationBar/NavigationBarCenter/NavigationBarCenter'
import NavigationBarRight
  from '@//:modules/content/Navigation/content/NavigationBar/NavigationBarRight/NavigationBarRight'
import MenuButton from '@//:modules/content/Navigation/components/MenuButton/MenuButton'
import NavigationMenu
  from '@//:modules/content/Navigation/content/NavigationBar/NavigationBarRight/NavigationMenu/NavigationMenu'

const routes = []

const SampleIcon = (): JSX.Element => {
  return (
    <svg />
  )
}

const SidebarComponent = (): JSX.Element => {
  return (
    <NavigationContents>
      <Sidebar title='sidebar title'>
        <SidebarGrouping label='sidebar grouping'>
          <SidebarButton active title='sidebar path' />
        </SidebarGrouping>
      </Sidebar>
      <PageContents>
        i can see the page contents
      </PageContents>
    </NavigationContents>
  )
}

const NavigationComponent = (): JSX.Element => {
  return (
    <NavigationBar>
      <NavigationBarLeft>
        left brand
      </NavigationBarLeft>
      <NavigationBarCenter>
        {/* <NavigationLink icon={SampleIcon} exact={false} label='navigation path' path='/' /> */}
      </NavigationBarCenter>
      <NavigationBarRight>
        <>
          right items
        </>
      </NavigationBarRight>
    </NavigationBar>
  )
}

const NavigationMenuComponent = (): JSX.Element => {
  return (
    <NavigationMenu>
      <MenuButton label='menu path' icon={SampleIcon} />
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
  const sidebarTitle = screen.getAllByText('sidebar title')
  for (const item of sidebarTitle) {
    expect(item).toBeInTheDocument()
  }

  // Expect the sidebar grouping to be visible
  const sidebarGroup = screen.getAllByText('sidebar grouping')
  for (const item of sidebarGroup) {
    expect(item).toBeInTheDocument()
  }

  // Expect the sidebar button to be visible
  const sidebarButton = screen.getAllByText('sidebar path')
  for (const item of sidebarButton) {
    expect(item).toBeInTheDocument()
  }

  // Expect page contents to be visible
  const pageContents = screen.getByText('i can see the page contents')
  expect(pageContents).toBeVisible()
})
