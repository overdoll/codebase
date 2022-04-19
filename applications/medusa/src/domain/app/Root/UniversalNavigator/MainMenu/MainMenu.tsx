import { BirdHouse, ContentBrushPen } from '@//:assets/icons/navigation'
import HorizontalNavigation from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigation'
import Can from '@//:modules/authorization/Can'
import { t } from '@lingui/macro'
import MainMenuButtonCreatePost from './MainMenuButtonCreatePost/MainMenuButtonCreatePost'
import { useLingui } from '@lingui/react'
import MainMenuButtonClubs from './MainMenuButtonClubs/MainMenuButtonClubs'

export default function MainMenu (): JSX.Element {
  const { i18n } = useLingui()

  return (
    <>
      <HorizontalNavigation.Button
        exact
        colorScheme='primary'
        href='/'
        icon={BirdHouse}
        label={i18n._(t`Home`)}
      />
      <MainMenuButtonClubs />
      <Can I='create' a='Post'>
        <MainMenuButtonCreatePost />
      </Can>
      <Can not I='create' a='Post'>
        <HorizontalNavigation.Button
          exact
          colorScheme='primary'
          href='/join'
          icon={ContentBrushPen}
          label={i18n._(t`Create a Post`)}
        />
      </Can>
    </>
  )
}
