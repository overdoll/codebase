import { graphql } from 'react-relay'
import type { PosterImageMediaFragment$key } from '@//:artifacts/PosterImageMediaFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import ImageMedia from '../../../components/ImageContainer/ImageWrapper/ImageMedia/ImageMedia'

const Fragment = graphql`
  fragment PosterImageMediaFragment on ImageMedia {
    variants {
      medium {
        url
        width
        height
      }
      small {
        url
        width
        height
      }
    }
  }
`

interface Props {
  imageMediaQuery: PosterImageMediaFragment$key
}

export default function PosterImageMedia (props: Props): JSX.Element {
  const {
    imageMediaQuery
  } = props

  const data = useFragment(Fragment, imageMediaQuery)

  return (
    <ImageMedia
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
    />
  )
}
