import { graphql } from 'react-relay'
import type { TopicIconFragment$key } from '@//:artifacts/TopicIconFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { IconSizes } from '../../../../../HookedComponents/Media/fragments/Media/IconImageMedia/IconImageMedia'
import IconSizer from '../../../../../HookedComponents/Media/fragments/IconMedia/IconSizer/IconSizer'
import RandomIcon from '../../../components/RandomIcon/RandomIcon'
import { IconMedia } from '../../../../../HookedComponents/Media'

const Fragment = graphql`
  fragment TopicIconFragment on Topic {
    id
    bannerMedia {
      ...IconMediaFragment
    }
  }
`

interface Props {
  topicQuery: TopicIconFragment$key
  size?: IconSizes
}

export default function TopicIcon (props: Props): JSX.Element {
  const {
    topicQuery,
    size = 'sm'
  } = props

  const data = useFragment(Fragment, topicQuery)

  if (data.bannerMedia == null) {
    return (
      <IconSizer size={size}>
        <RandomIcon seed={data.id} />
      </IconSizer>
    )
  }

  return (
    <IconMedia mediaQuery={data.bannerMedia} />
  )
}
