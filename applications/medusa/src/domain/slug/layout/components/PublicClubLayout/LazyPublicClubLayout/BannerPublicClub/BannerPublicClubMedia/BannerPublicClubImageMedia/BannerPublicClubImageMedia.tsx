import { graphql } from 'react-relay'
import { BannerPublicClubImageMediaFragment$key } from '@//:artifacts/BannerPublicClubImageMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ImageCoverContainer
  from '@//:modules/content/HookedComponents/Media/components/ImageContainer/ImageCoverContainer/ImageCoverContainer'

const Fragment = graphql`
  fragment BannerPublicClubImageMediaFragment on ImageMedia {
    colorPalettes {
      red
      green
      blue
    }
    variants {
      small {
        url
        width
        height
      }
      medium {
        url
        width
        height
      }
      large {
        url
        width
        height
      }
    }
  }
`

interface Props {
  imageMediaQuery: BannerPublicClubImageMediaFragment$key
}

export default function BannerPublicClubImageMedia (props: Props): JSX.Element {
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
      variants={(
        <>
          <source
            media='(min-width: 760px)'
            srcSet={data.variants.large.url}
            width={data.variants.large.width}
            height={data.variants.large.height}
          />
          <source
            media='(min-width: 330px)'
            srcSet={data.variants.medium.url}
            width={data.variants.medium.width}
            height={data.variants.medium.height}
          />
        </>
      )}
      url={data.variants.small.url}
      width={data.variants.small.width}
      height={data.variants.small.height}
      rgb={rgb}
    />
  )
}
