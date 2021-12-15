import { BirdHouse, ContentBrushPen, LoginKeys } from '@//:assets/icons/navigation'
import { useTranslation } from 'react-i18next'
import useAbility from '@//:modules/authorization/useAbility'
import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'

export default function MainMenu (): JSX.Element {
  const [t] = useTranslation('navigation')

  const ability = useAbility()

  const canViewModerationQueue = !ability.can('read', 'locked') && ability.can('read', 'pendingPosts')
  const canCreatePost = !ability.can('read', 'locked') && ability.can('manage', 'posting')

  return (
    <>
      <HorizontalNavigation.Button
        exact
        to='/'
        icon={BirdHouse}
        label={t('nav.home')}
      />
      {canViewModerationQueue && (
        <HorizontalNavigation.Button
          exact
          to='/moderation/queue'
          icon={LoginKeys}
          label={t('nav.mod')}
        />
      )}
      {canCreatePost && (
        <HorizontalNavigation.Button
          exact
          to='/configure/create_post'
          icon={ContentBrushPen}
          label={t('nav.create_post')}
        />
      )}
    </>
  )
}
