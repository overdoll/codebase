import { graphql } from 'react-relay'
import type { SmallBannerImageMediaFragment$key } from '@//:artifacts/SmallBannerImageMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ImageCoverContainer from '../../../components/ImageContainer/ImageCoverContainer/ImageCoverContainer'

const Fragment = graphql`
  fragment SmallBannerImageMediaFragment on ImageMedia {
    colorPalettes {
      red
      green
      blue
    }
    variants {
      smallBanner {
        url
        width
        height
      }
    }
  }
`

interface Props {
  imageMediaQuery: SmallBannerImageMediaFragment$key
}

export default function SmallBannerImageMedia (props: Props): JSX.Element {
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
      url={data.variants.smallBanner.url}
      width={data.variants.smallBanner.width}
      height={data.variants.smallBanner.height}
      rgb={rgb}
    />
  )
}
