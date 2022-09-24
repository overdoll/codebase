import { graphql } from 'react-relay'
import type { BannerImageMediaFragment$key } from '@//:artifacts/BannerImageMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ImageCoverContainer from '../../../components/ImageContainer/ImageCoverContainer/ImageCoverContainer'

const Fragment = graphql`
  fragment BannerImageMediaFragment on ImageMedia {
    colorPalettes {
      red
      green
      blue
    }
    variants {
      banner {
        url
        width
        height
      }
    }
  }
`

interface Props {
  imageMediaQuery: BannerImageMediaFragment$key
}

export default function BannerImageMedia (props: Props): JSX.Element {
  const {
    imageMediaQuery
  } = props

  const data = useFragment(Fragment, imageMediaQuery)

  const colorPalette = data.colorPalettes?.[0]

  const rgb = {
    red: colorPalette?.red ?? 0,
    green: colorPalette?.green ?? 0,
    blue: colorPalette?.blue ?? 0
  }

  return (
    <ImageCoverContainer
      url={data.variants.banner.url}
      width={data.variants.banner.width}
      height={data.variants.banner.height}
      rgb={rgb}
    />
  )
}
