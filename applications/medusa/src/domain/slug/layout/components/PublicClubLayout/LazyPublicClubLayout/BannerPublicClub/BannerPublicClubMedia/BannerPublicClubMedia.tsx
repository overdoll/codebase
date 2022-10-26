import { graphql } from 'react-relay'
import { BannerPublicClubMediaFragment$key } from '@//:artifacts/BannerPublicClubMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import BannerPublicClubImageMedia from './BannerPublicClubImageMedia/BannerPublicClubImageMedia'

const Fragment = graphql`
  fragment BannerPublicClubMediaFragment on Media {
    __typename
    ...on ImageMedia {
      ...BannerPublicClubImageMediaFragment
    }
    ...on VideoMedia {
      cover {
        ...BannerPublicClubImageMediaFragment
      }
    }
  }
`

interface Props {
  mediaQuery: BannerPublicClubMediaFragment$key
}

export default function BannerPublicClubMedia (props: Props): JSX.Element {
  const {
    mediaQuery
  } = props

  const data = useFragment(Fragment, mediaQuery)

  if (data.__typename === 'ImageMedia') {
    return (
      <BannerPublicClubImageMedia imageMediaQuery={data} />
    )
  }

  if (data.__typename === 'VideoMedia') {
    return (
      <BannerPublicClubImageMedia imageMediaQuery={data.cover} />
    )
  }

  return <></>
}
