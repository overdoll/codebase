import { graphql } from 'react-relay'
import type { PosterImageMediaFragment$key } from '@//:artifacts/PosterImageMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ImageMedia, { ImageMediaProps } from '../../../components/ImageContainer/ImageWrapper/ImageMedia/ImageMedia'

const Fragment = graphql`
  fragment PosterImageMediaFragment on ImageMedia {
    variants {
      small {
        url
        width
        height
      }
    }
  }
`

export interface PosterImageMediaProps {
  imageProps?: Pick<ImageMediaProps, 'loadFirst'>
}

interface Props extends PosterImageMediaProps {
  imageMediaQuery: PosterImageMediaFragment$key
}

export default function PosterImageMedia (props: Props): JSX.Element {
  const {
    imageMediaQuery,
    imageProps
  } = props

  const data = useFragment(Fragment, imageMediaQuery)

  return (
    <ImageMedia
      url={data.variants.small.url}
      width={data.variants.small.width}
      height={data.variants.small.height}
      {...imageProps}
    />
  )
}
