import { graphql } from 'react-relay'
import type { ThumbnailMediaFragment$key } from '@//:artifacts/ThumbnailMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ThumbnailImageMedia, { ThumbnailImageMediaProps } from '../Media/ThumbnailImageMedia/ThumbnailImageMedia'

const Fragment = graphql`
  fragment ThumbnailMediaFragment on Media {
    __typename
    ...on ImageMedia {
      ...ThumbnailImageMediaFragment
    }
    ...on VideoMedia {
      cover {
        ...ThumbnailImageMediaFragment
      }
    }
  }
`

interface Props extends ThumbnailImageMediaProps {
  mediaQuery: ThumbnailMediaFragment$key
}

export default function ThumbnailMedia (props: Props): JSX.Element {
  const {
    mediaQuery,
    imageProps
  } = props

  const data = useFragment(Fragment, mediaQuery)

  if (data?.__typename === 'ImageMedia') {
    return (
      <ThumbnailImageMedia imageMediaQuery={data} imageProps={imageProps} />
    )
  }

  if (data?.__typename === 'VideoMedia') {
    return (
      <ThumbnailImageMedia imageMediaQuery={data.cover} imageProps={imageProps} />
    )
  }

  return <></>
}
