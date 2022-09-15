import { graphql } from 'react-relay'
import type { IconImageMediaFragment$key } from '@//:artifacts/IconImageMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ImageCoverContainer from '../../../components/ImageContainer/ImageCoverContainer/ImageCoverContainer'

const Fragment = graphql`
  fragment IconImageMediaFragment on ImageMedia {
    id
    colorPalettes {
      red
      green
      blue
    }
    variants {
      icon {
        url
        width
        height
      }
      mini {
        url
        width
        height
      }
    }
  }
`

export type IconSizes = 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  imageMediaQuery: IconImageMediaFragment$key
  size: IconSizes
}

export default function IconImageMedia (props: Props): JSX.Element {
  const {
    imageMediaQuery,
    size
  } = props

  const data = useFragment(Fragment, imageMediaQuery)

  const colorPalette = data.colorPalettes[0]

  const rgb = {
    red: colorPalette.red,
    green: colorPalette.green,
    blue: colorPalette.blue
  }

  if (size === 'sm' || size === 'md') {
    return (
      <ImageCoverContainer
        url={data.variants.mini.url}
        width={data.variants.mini.width}
        height={data.variants.mini.height}
        rgb={rgb}
      />
    )
  }

  return (
    <ImageCoverContainer
      url={data.variants.icon.url}
      width={data.variants.icon.width}
      height={data.variants.icon.height}
      rgb={rgb}
    />
  )
}
