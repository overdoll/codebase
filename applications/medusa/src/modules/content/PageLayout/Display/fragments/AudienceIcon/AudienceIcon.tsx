import { graphql } from 'react-relay'
import type { AudienceIconFragment$key } from '@//:artifacts/AudienceIconFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { IconSizes } from '../../../../HookedComponents/Media/fragments/Media/IconImageMedia/IconImageMedia'
import IconSizer from '../../../../HookedComponents/Media/fragments/IconMedia/IconSizer/IconSizer'
import RandomIcon from '../../components/RandomIcon/RandomIcon'
import { IconMedia } from '../../../../HookedComponents/Media'

const Fragment = graphql`
  fragment AudienceIconFragment on Audience {
    id
    bannerMedia {
      ...IconMediaFragment
    }
  }
`

interface Props {
  clubQuery: AudienceIconFragment$key
  size?: IconSizes
}

export default function AudienceIcon (props: Props): JSX.Element {
  const {
    clubQuery,
    size = 'sm'
  } = props

  const data = useFragment(Fragment, clubQuery)

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
