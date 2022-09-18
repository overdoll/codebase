import { graphql } from 'react-relay'
import type { ThumbnailImageMediaFragment$key } from '@//:artifacts/ThumbnailImageMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ImageCoverContainer from '../../../components/ImageContainer/ImageCoverContainer/ImageCoverContainer'
import { ImageMediaProps } from '../../../components/ImageContainer/ImageWrapper/ImageMedia/ImageMedia'

const Fragment = graphql`
  fragment ThumbnailImageMediaFragment on ImageMedia {
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

export interface ThumbnailImageMediaProps {
  imageProps?: Pick<ImageMediaProps, 'loadFirst'>
}

interface Props extends ThumbnailImageMediaProps {
  imageMediaQuery: ThumbnailImageMediaFragment$key
}

export default function ThumbnailImageMedia (props: Props): JSX.Element {
  const {
    imageMediaQuery,
    imageProps
  } = props

  const data = useFragment(Fragment, imageMediaQuery)

  const colorPalette = data.colorPalettes[0]

  const rgb = {
    red: colorPalette.red,
    green: colorPalette.green,
    blue: colorPalette.blue
  }

  return (
    <ImageCoverContainer
      url={data.variants.thumbnail.url}
      width={data.variants.thumbnail.width}
      height={data.variants.thumbnail.height}
      rgb={rgb}
      {...imageProps}
    />
  )
}
