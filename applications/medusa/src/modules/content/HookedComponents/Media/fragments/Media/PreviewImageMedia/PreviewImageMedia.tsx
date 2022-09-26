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

  const colorPalette = data.colorPalettes?.[0]

  const rgb = {
    red: colorPalette?.red ?? 0,
    green: colorPalette?.green ?? 0,
    blue: colorPalette?.blue ?? 0
  }

  return (
    <ImageContainContainer
      variants={(
        <>
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
