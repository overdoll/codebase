import { BirdHouse } from '@//:assets/icons/navigation'
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
      <Can I='create' a='Post'>
        <MainMenuButtonCreatePost />
      </Can>
    </>
  )
}
