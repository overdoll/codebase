import { graphql } from 'react-relay'
import type { CinematicImageMediaFragment$key } from '@//:artifacts/CinematicImageMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ImageControlContainer from '../../../components/ImageContainer/ImageControlContainer/ImageControlContainer'
import BackgroundPosterImageMedia from '../BackgroundPosterImageMedia/BackgroundPosterImageMedia'

const Fragment = graphql`
  fragment CinematicImageMediaFragment on ImageMedia {
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
      hd {
        url
        width
        height
      }
    }
    ...BackgroundPosterImageMediaFragment
  }
`

interface Props {
  imageMediaQuery: CinematicImageMediaFragment$key
}

export default function CinematicImageMedia (props: Props): JSX.Element {
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
    <ImageControlContainer
      backgroundPoster={<BackgroundPosterImageMedia imageMediaQuery={data} />}
      variants={(
        <>
          <source
            media='(min-width: 80em)'
            srcSet={data.variants.hd.url}
            width={data.variants.hd.width}
            height={data.variants.hd.height}
          />
          <source
            media='(min-width: 48em)'
            srcSet={data.variants.large.url}
            width={data.variants.large.width}
            height={data.variants.large.height}
          />
          <source
            media='(min-width: 30em)'
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
