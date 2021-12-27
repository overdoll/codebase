import { BirdHouse, ContentBrushPen, LoginKeys } from '@//:assets/icons/navigation'
import HorizontalNavigation from '@//:modules/content/HorizontalNavigation/HorizontalNavigation'
import Can from '@//:modules/authorization/Can'
import { Trans } from '@lingui/macro'

export default function MainMenu (): JSX.Element {
  return (
    <>
      <HorizontalNavigation.Button
        exact
        to='/'
        icon={BirdHouse}
        label={
          <Trans>
            Home
          </Trans>
        }
      />
      <Can I='moderate' a='Post'>
        <HorizontalNavigation.Button
          exact
          to='/moderation/queue'
          icon={LoginKeys}
          label={
            <Trans>
              Moderation
            </Trans>
          }
        />
      </Can>
      <Can I='create' a='Post'>
        <HorizontalNavigation.Button
          exact
          to='/configure/create-post'
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
