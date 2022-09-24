import { graphql } from 'react-relay'
import type { BackgroundPosterImageMediaFragment$key } from '@//:artifacts/BackgroundPosterImageMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ImageMedia, { ImageMediaProps } from '../../../components/ImageContainer/ImageWrapper/ImageMedia/ImageMedia'

const Fragment = graphql`
  fragment BackgroundPosterImageMediaFragment on ImageMedia {
    colorPalettes {
      red
      green
      blue
    }
    variants {
      thumbnail {
        url
        width
        height
      }
    }
  }
`

export interface BackgroundPosterImageMediaProps {
  imageProps?: Pick<ImageMediaProps, 'loadFirst'>
}

interface Props extends BackgroundPosterImageMediaProps {
  imageMediaQuery: BackgroundPosterImageMediaFragment$key
}

export default function BackgroundPosterImageMedia (props: Props): JSX.Element {
  const {
    imageMediaQuery,
    imageProps
  } = props

  const data = useFragment(Fragment, imageMediaQuery)

  const colorPalette = data.colorPalettes?.[0]

  const rgb = {
    red: colorPalette?.red ?? 0,
    green: colorPalette?.green ?? 0,
    blue: colorPalette?.blue ?? 0
  }

  const bgColor = `rgb(${rgb.red},${rgb.green},${rgb.blue})`

  return (
    <ImageMedia
      color={bgColor}
      width={data.variants.thumbnail.width}
      height={data.variants.thumbnail.height}
      url={data.variants.thumbnail.url}
      {...imageProps}
    />
  )
}
