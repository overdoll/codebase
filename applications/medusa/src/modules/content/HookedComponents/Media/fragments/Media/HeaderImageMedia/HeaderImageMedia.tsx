import { graphql } from 'react-relay'
import { ImageMediaProps } from '../../../components/ImageContainer/ImageWrapper/ImageMedia/ImageMedia'
import { HeaderImageMediaFragment$key } from '@//:artifacts/HeaderImageMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import BackgroundPosterImageMedia from '../BackgroundPosterImageMedia/BackgroundPosterImageMedia'
import ImageHeaderContainer from '../../../components/ImageContainer/ImageHeaderContainer/ImageHeaderContainer'

const Fragment = graphql`
  fragment HeaderImageMediaFragment on ImageMedia {
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
    ...BackgroundPosterImageMediaFragment
    ...HdImageMediaFragment
  }
`

export interface CinematicImageMediaProps {
  imageProps?: Pick<ImageMediaProps, 'loadFirst'>
}

interface Props extends CinematicImageMediaProps {
  imageMediaQuery: HeaderImageMediaFragment$key
}

export default function HeaderImageMedia (props: Props): JSX.Element {
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

  return (
    <ImageHeaderContainer
      backgroundPoster={<BackgroundPosterImageMedia imageMediaQuery={data} />}
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
      {...imageProps}
    />
  )
}
