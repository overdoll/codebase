import { BirdHouse, SearchBar } from '@//:assets/icons/navigation'
import HorizontalNavigationButton
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationButton/HorizontalNavigationButton'
import Can from '@//:modules/authorization/Can'
import { t } from '@lingui/macro'
import MainMenuButtonCreatePost from './MainMenuButtonCreatePost/MainMenuButtonCreatePost'
import { useLingui } from '@lingui/react'
import MainMenuButtonClubs from './MainMenuButtonClubs/MainMenuButtonClubs'

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
      <MainMenuButtonClubs />
      <Can not I='create' a='Club'>
        <HorizontalNavigationButton
          colorScheme='primary'
          href='/search'
          icon={SearchBar}
          label={i18n._(t`Search`)}
        />
      </Can>
      <Can I='create' a='Post'>
        <MainMenuButtonCreatePost />
      </Can>
    </>
  )
}
