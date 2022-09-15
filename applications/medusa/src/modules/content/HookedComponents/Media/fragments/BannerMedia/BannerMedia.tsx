import { graphql } from 'react-relay'
import type { BannerMediaFragment$key } from '@//:artifacts/BannerMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import BannerImageMedia from '../Media/BannerImageMedia/BannerImageMedia'

const Fragment = graphql`
  fragment BannerMediaFragment on Media {
    __typename
    ...on ImageMedia {
      ...BannerImageMediaFragment
    }
    ...on VideoMedia {
      cover {
        ...BannerImageMediaFragment
      }
    }
  }
`

interface Props {
  mediaQuery: BannerMediaFragment$key
}

export default function BannerMedia (props: Props): JSX.Element {
  const {
    mediaQuery
  } = props

  const data = useFragment(Fragment, mediaQuery)

  if (data.__typename === 'ImageMedia') {
    return (
      <BannerImageMedia imageMediaQuery={data} />
    )
  }

  if (data.__typename === 'VideoMedia') {
    return (
      <BannerImageMedia imageMediaQuery={data.cover} />
    )
  }

  return <></>
}
