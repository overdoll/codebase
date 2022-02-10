import { BirdHouse, ClubPeopleGroup, ContentBrushPen } from '@//:assets/icons/navigation'
import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import Can from '@//:modules/authorization/Can'
import { t } from '@lingui/macro'
import MainMenuButtonCreatePost from './MainMenuButtonCreatePost/MainMenuButtonCreatePost'
import { useLingui } from '@lingui/react'

export default function MainMenu (): JSX.Element {
  const { i18n } = useLingui()

  return (
    <>
      <HorizontalNavigation.Button
        exact
        colorScheme='primary'
        to='/'
        icon={BirdHouse}
        label={i18n._(t`Home`)}
      />
      <HorizontalNavigation.Button
        exact
        colorScheme='primary'
        to='/clubs'
        icon={ClubPeopleGroup}
        label={i18n._(t`My Clubs`)}
      />
      <Can I='create' a='Post'>
        <MainMenuButtonCreatePost />
      </Can>
      <Can not I='create' a='Post'>
        <HorizontalNavigation.Button
          exact
          colorScheme='primary'
          to='/join'
          icon={ContentBrushPen}
          label={i18n._(t`Create a Post`)}
        />
      </Can>
    </>
  )
}
