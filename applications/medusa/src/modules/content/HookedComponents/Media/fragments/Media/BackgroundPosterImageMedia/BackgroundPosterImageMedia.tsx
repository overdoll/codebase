import { graphql } from 'react-relay'
import type { BackgroundPosterImageMediaFragment$key } from '@//:artifacts/BackgroundPosterImageMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ImageMedia from '../../../components/ImageContainer/ImageWrapper/ImageMedia/ImageMedia'

const Fragment = graphql`
  fragment BackgroundPosterImageMediaFragment on ImageMedia {
    variants {
      thumbnail {
        url
        width
        height
      }
    }
  }
`

interface Props {
  imageMediaQuery: BackgroundPosterImageMediaFragment$key
}

export default function BackgroundPosterImageMedia (props: Props): JSX.Element {
  const {
    imageMediaQuery
  } = props

  const data = useFragment(Fragment, imageMediaQuery)

  return (
    <ImageMedia
      width={data.variants.thumbnail.width}
      height={data.variants.thumbnail.height}
      url={data.variants.thumbnail.url}
    />
  )
}
