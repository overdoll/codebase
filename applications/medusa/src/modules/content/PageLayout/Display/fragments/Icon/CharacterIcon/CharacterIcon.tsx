import { graphql } from 'react-relay'
import type { CharacterIconFragment$key } from '@//:artifacts/CharacterIconFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { IconSizes } from '../../../../../HookedComponents/Media/fragments/Media/IconImageMedia/IconImageMedia'
import IconSizer from '../../../../../HookedComponents/Media/fragments/IconMedia/IconSizer/IconSizer'
import RandomIcon from '../../../components/RandomIcon/RandomIcon'
import { IconMedia } from '../../../../../HookedComponents/Media'
import { FlexProps } from '@chakra-ui/react'

const Fragment = graphql`
  fragment CharacterIconFragment on Character {
    id
    bannerMedia {
      __typename
      ...IconMediaFragment
    }
  }
`

interface Props {
  characterQuery: CharacterIconFragment$key
  size?: IconSizes
  sizerProps?: FlexProps
}

export default function CharacterIcon (props: Props): JSX.Element {
  const {
    characterQuery,
    size = 'sm',
    sizerProps
  } = props

  const data = useFragment(Fragment, characterQuery)

  if (data.bannerMedia == null || data.bannerMedia.__typename === 'RawMedia') {
    return (
      <IconSizer size={size} {...sizerProps}>
        <RandomIcon size={size} seed={data.id} />
      </IconSizer>
    )
  }

  return (
    <IconMedia mediaQuery={data.bannerMedia} sizerProps={sizerProps} />
  )
}
