import { graphql } from 'react-relay'
import type { ClubIconFragment$key } from '@//:artifacts/ClubIconFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { IconSizes } from '../../../../../HookedComponents/Media/fragments/Media/IconImageMedia/IconImageMedia'
import IconSizer from '../../../../../HookedComponents/Media/fragments/IconMedia/IconSizer/IconSizer'
import RandomIcon from '../../../components/RandomIcon/RandomIcon'
import { IconMedia } from '../../../../../HookedComponents/Media'
import { FlexProps } from '@chakra-ui/react'

const Fragment = graphql`
  fragment ClubIconFragment on Club {
    id
    thumbnailMedia {
      __typename
      ...IconMediaFragment
    }
  }
`

interface Props extends FlexProps {
  clubQuery: ClubIconFragment$key
  size?: IconSizes
}

export default function ClubIcon (props: Props): JSX.Element {
  const {
    clubQuery,
    size = 'sm',
    ...rest
  } = props

  const data = useFragment(Fragment, clubQuery)

  if (data.thumbnailMedia == null || data.thumbnailMedia.__typename === 'RawMedia') {
    return (
      <IconSizer size={size} {...rest}>
        <RandomIcon seed={data.id} />
      </IconSizer>
    )
  }

  return (
    <IconMedia sizerProps={{ ...rest }} size={size} mediaQuery={data.thumbnailMedia} />
  )
}
