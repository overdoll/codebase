import { graphql } from 'react-relay'
import type { ThumbnailImageMediaFragment$key } from '@//:artifacts/ThumbnailImageMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ImageCoverContainer from '../../../components/ImageContainer/ImageCoverContainer/ImageCoverContainer'

const Fragment = graphql`
  fragment ThumbnailImageMediaFragment on ImageMedia {
    id
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
      thumbnailHd {
        url
        width
        height
      }
    }
  }
`

interface Props {
  imageMediaQuery: ThumbnailImageMediaFragment$key
}

export default function ThumbnailImageMedia (props: Props): JSX.Element {
  const {
    imageMediaQuery
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
      variants={(
        <source
          src={data.variants.thumbnail.url}
          width={data.variants.thumbnail.width}
          height={data.variants.thumbnail.height}
        />
      )}
      url={data.variants.thumbnailHd.url}
      width={data.variants.thumbnailHd.width}
      height={data.variants.thumbnailHd.height}
      rgb={rgb}
    />
  )
}
