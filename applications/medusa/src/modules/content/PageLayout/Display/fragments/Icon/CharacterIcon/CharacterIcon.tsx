import { graphql } from 'react-relay'
import type { CharacterIconFragment$key } from '@//:artifacts/CharacterIconFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { IconSizes } from '../../../../../HookedComponents/Media/fragments/Media/IconImageMedia/IconImageMedia'
import IconSizer from '../../../../../HookedComponents/Media/fragments/IconMedia/IconSizer/IconSizer'
import RandomIcon from '../../../components/RandomIcon/RandomIcon'
import { IconMedia } from '../../../../../HookedComponents/Media'

const Fragment = graphql`
  fragment CharacterIconFragment on Character {
    id
    bannerMedia {
      ...IconMediaFragment
    }
  }
`

interface Props {
  characterQuery: CharacterIconFragment$key
  size?: IconSizes
}

export default function CharacterIcon (props: Props): JSX.Element {
  const {
    characterQuery,
    size = 'sm'
  } = props

  const data = useFragment(Fragment, characterQuery)

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
