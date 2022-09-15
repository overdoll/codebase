import { graphql } from 'react-relay'
import type { IconMediaFragment$key } from '@//:artifacts/IconMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import IconImageMedia, { IconSizes } from '../Media/IconImageMedia/IconImageMedia'
import IconSizer from './IconSizer/IconSizer'

const Fragment = graphql`
  fragment IconMediaFragment on Media {
    __typename
    ...on ImageMedia {
      ...IconImageMediaFragment
    }
    ...on VideoMedia {
      cover {
        ...IconImageMediaFragment
      }
    }
  }
`

interface Props {
  mediaQuery: IconMediaFragment$key
  size?: IconSizes
}

export default function IconMedia (props: Props): JSX.Element {
  const {
    mediaQuery,
    size = 'sm'
  } = props

  const data = useFragment(Fragment, mediaQuery)

  if (data.__typename === 'ImageMedia') {
    return (
      <IconSizer size={size}>
        <IconImageMedia imageMediaQuery={data} size={size} />
      </IconSizer>
    )
  }

  if (data.__typename === 'VideoMedia') {
    return (
      <IconSizer size={size}>
        <IconImageMedia imageMediaQuery={data.cover} size={size} />
      </IconSizer>
    )
  }

  return <></>
}
