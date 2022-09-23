import { graphql } from 'react-relay'
import type { SmallBannerMediaFragment$key } from '@//:artifacts/SmallBannerMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import SmallBannerImageMedia from '../Media/SmallBannerImageMedia/SmallBannerImageMedia'

const Fragment = graphql`
  fragment SmallBannerMediaFragment on Media {
    __typename
    ...on ImageMedia {
      ...SmallBannerImageMediaFragment
    }
    ...on VideoMedia {
      cover {
        ...SmallBannerImageMediaFragment
      }
    }
  }
`

interface Props {
  mediaQuery: SmallBannerMediaFragment$key
}

export default function SmallBannerMedia (props: Props): JSX.Element {
  const {
    mediaQuery
  } = props

  const data = useFragment(Fragment, mediaQuery)

  if (data.__typename === 'ImageMedia') {
    return (
      <SmallBannerImageMedia imageMediaQuery={data} />
    )
  }

  if (data.__typename === 'VideoMedia') {
    return (
      <SmallBannerImageMedia imageMediaQuery={data.cover} />
    )
  }

  return <></>
}
