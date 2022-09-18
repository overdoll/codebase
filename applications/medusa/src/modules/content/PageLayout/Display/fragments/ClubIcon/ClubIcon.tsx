import { graphql } from 'react-relay'
import type { ClubIconFragment$key } from '@//:artifacts/ClubIconFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { IconSizes } from '../../../../HookedComponents/Media/fragments/Media/IconImageMedia/IconImageMedia'
import IconSizer from '../../../../HookedComponents/Media/fragments/IconMedia/IconSizer/IconSizer'
import RandomIcon from '../../components/RandomIcon/RandomIcon'
import { IconMedia } from '../../../../HookedComponents/Media'

const Fragment = graphql`
  fragment ClubIconFragment on Club {
    id
    thumbnailMedia {
      ...IconMediaFragment
    }
  }
`

interface Props {
  clubQuery: ClubIconFragment$key
  size?: IconSizes
}

export default function ClubIcon (props: Props): JSX.Element {
  const {
    clubQuery,
    size = 'sm'
  } = props

  const data = useFragment(Fragment, clubQuery)

  if (data.thumbnailMedia == null) {
    return (
      <IconSizer size={size}>
        <RandomIcon seed={data.id} />
      </IconSizer>
    )
  }

  return (
    <IconMedia mediaQuery={data.thumbnailMedia} />
  )
}
