import { BirdHouse, ContentBrushPen, LoginKeys } from '@//:assets/icons/navigation'
import { useTranslation } from 'react-i18next'
import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import Can from '@//:modules/authorization/Can'

export default function MainMenu (): JSX.Element {
  const [t] = useTranslation('navigation')

  return (
    <>
      <HorizontalNavigation.Button
        exact
        to='/'
        icon={BirdHouse}
        label={t('nav.home')}
      />
      <Can I='moderate' a='Post'>
        <HorizontalNavigation.Button
          exact
          to='/moderation/queue'
          icon={LoginKeys}
          label={t('nav.mod')}
        />
      </Can>
      <Can I='create' a='Post'>
        <HorizontalNavigation.Button
          exact
          to='/configure/create-post'
          icon={ContentBrushPen}
          label={t('nav.create_post')}
        />
      </Can>
    </>
  )
}
