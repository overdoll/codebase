import { BirdHouse, ContentBrushPen, SettingHammer } from '@//:assets/icons/navigation'
import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import Can from '@//:modules/authorization/Can'
import { Trans } from '@lingui/macro'
import MainMenuButtonCreatePost from './MainMenuButtonCreatePost/MainMenuButtonCreatePost'

export default function MainMenu (): JSX.Element {
  return (
    <>
      <HorizontalNavigation.Button
        exact
        colorScheme='primary'
        to='/'
        icon={BirdHouse}
        label={
          <Trans>
            Home
          </Trans>
        }
      />
      <HorizontalNavigation.Button
        exact
        colorScheme='green'
        to='/clubs'
        icon={SettingHammer}
        label={
          <Trans>
            My Clubs
          </Trans>
        }
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
          label={
            <Trans>
              Create a Post
            </Trans>
          }
        />
      </Can>
    </>
  )
}
