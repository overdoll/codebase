import { graphql } from 'react-relay'
import type { PreviewGridImageMediaFragment$key } from '@//:artifacts/PreviewGridImageMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ImageCoverContainer from '../../components/ImageContainer/ImageCoverContainer/ImageCoverContainer'

const Fragment = graphql`
  fragment PreviewGridImageMediaFragment on ImageMedia {
    variants {
      banner {
        url
        width
        height
      }
      smallBanner {
        url
        width
        height
      }
    }
  }
`

interface Props {
  imageMediaQuery: PreviewGridImageMediaFragment$key
  isSmall: boolean
}

export default function PreviewGridImageMedia (props: Props): JSX.Element {
  const {
    imageMediaQuery,
    isSmall
  } = props

  const data = useFragment(Fragment, imageMediaQuery)

  return (
    <ImageCoverContainer
      tiny
      url={isSmall ? data.variants.smallBanner.url : data.variants.banner.url}
      width={isSmall ? data.variants.smallBanner.width : data.variants.banner.width}
      height={isSmall ? data.variants.smallBanner.height : data.variants.banner.height}
    />
  )
}
