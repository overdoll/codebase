import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import { t } from '@lingui/macro'
import { FeedMenu } from '@//:assets/icons'
import { MainMenuButtonFeedQuery } from '@//:artifacts/MainMenuButtonFeedQuery.graphql'
import { useLingui } from '@lingui/react'
import HorizontalNavigationButton
  from '@//:modules/content/Navigation/HorizontalNavigation/HorizontalNavigationButton/HorizontalNavigationButton'
import { useMemo } from 'react'
import isBefore from 'date-fns/isBefore'

const Query = graphql`
  query MainMenuButtonFeedQuery {
    viewer {
      clubMembershipsCount
      curationProfile {
        audience {
          completed
        }
      }
      curatedPostsFeedData {
        viewedAt
        nextRegenerationTime
        generatedAt
      }
    }
  }
`

export default function MainMenuButtonFeed (): JSX.Element {
  const data = useLazyLoadQuery<MainMenuButtonFeedQuery>(Query, {})

  const { i18n } = useLingui()

  return useMemo(() => (
    <HorizontalNavigationButton
      exact
      colorScheme='primary'
      hasBadge={data?.viewer == null ||
        data.viewer?.clubMembershipsCount < 1 ||
        !data.viewer?.curationProfile?.audience?.completed ||
        data.viewer.curatedPostsFeedData.viewedAt == null ||
        data.viewer.curatedPostsFeedData.generatedAt == null ||
        isBefore(new Date(data.viewer.curatedPostsFeedData.nextRegenerationTime), new Date())}
      href='/feed'
      icon={FeedMenu}
      label={i18n._(t`Your Feed`)}
    />), [data.viewer, data?.viewer?.clubMembershipsCount, data?.viewer?.curationProfile?.audience?.completed])
}
