import { graphql } from 'react-relay'
import type { HdImageMediaFragment$key } from '@//:artifacts/HdImageMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ImageMedia from '../../../components/ImageContainer/ImageWrapper/ImageMedia/ImageMedia'

const Fragment = graphql`
  fragment HdImageMediaFragment on ImageMedia {
    variants {
      hd {
        url
        width
        height
      }
    }
  }
`

interface Props {
  imageMediaQuery: HdImageMediaFragment$key
}

export default function HdImageMedia (props: Props): JSX.Element {
  const {
    imageMediaQuery
  } = props

  const data = useFragment(Fragment, imageMediaQuery)

  return (
    <ImageMedia
      width={data.variants.hd.width}
      height={data.variants.hd.height}
      url={data.variants.hd.url}
    />
  )
}
