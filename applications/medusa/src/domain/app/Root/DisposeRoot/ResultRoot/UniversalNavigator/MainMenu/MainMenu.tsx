import { BirdHouse, SearchBar } from '@//:assets/icons/navigation'
import HorizontalNavigationButton
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationButton/HorizontalNavigationButton'
import Can from '@//:modules/authorization/Can'
import { t } from '@lingui/macro'
import MainMenuButtonCreatePost from './MainMenuButtonCreatePost/MainMenuButtonCreatePost'
import { useLingui } from '@lingui/react'
import MainMenuButtonFeed from './MainMenuButtonFeed/MainMenuButtonFeed'

export default function MainMenu (): JSX.Element {
  const { i18n } = useLingui()

  return (
    <>
      <HorizontalNavigationButton
        exact
        colorScheme='primary'
        href='/'
        icon={BirdHouse}
        label={i18n._(t`Home`)}
      />
      <MainMenuButtonFeed />
      <HorizontalNavigationButton
        colorScheme='primary'
        href='/search'
        icon={SearchBar}
        label={i18n._(t`Search`)}
      />
      <Can I='create' a='Post'>
        <MainMenuButtonCreatePost />
      </Can>
    </>
  )
}
