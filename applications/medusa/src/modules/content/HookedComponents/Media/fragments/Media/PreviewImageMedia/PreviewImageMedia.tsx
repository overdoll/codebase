import { graphql } from 'react-relay'
import type { PreviewImageMediaFragment$key } from '@//:artifacts/PreviewImageMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ImageContainContainer from '../../../components/ImageContainer/ImageContainContainer/ImageContainContainer'

const Fragment = graphql`
  fragment PreviewImageMediaFragment on ImageMedia {
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
    }
  }
`

interface Props {
  imageMediaQuery: PreviewImageMediaFragment$key
}

export default function PreviewImageMedia (props: Props): JSX.Element {
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
    <ImageContainContainer
      variants={(
        <source
          media='(min-width: 30em)'
          srcSet={data.variants.medium.url}
          width={data.variants.medium.width}
          height={data.variants.medium.height}
        />
      )}
      url={data.variants.small.url}
      width={data.variants.small.width}
      height={data.variants.small.height}
      rgb={rgb}
    />
  )
}
