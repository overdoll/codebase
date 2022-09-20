import { graphql } from 'react-relay'
import type { CategoryThumbnailFragment$key } from '@//:artifacts/CategoryThumbnailFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { ThumbnailMedia } from '../../../../../HookedComponents/Media'
import CoverImage
  from '../../../../../HookedComponents/Media/components/ImageContainer/ImageWrapper/CoverImage/CoverImage'
import RandomPattern from '../../../components/RandomPattern/RandomPattern'

const Fragment = graphql`
  fragment CategoryThumbnailFragment on Category {
    id
    bannerMedia {
      __typename
      ...ThumbnailMediaFragment
    }
  }
`

interface Props {
  categoryQuery: CategoryThumbnailFragment$key
}

export default function CategoryThumbnail (props: Props): JSX.Element {
  const {
    categoryQuery
  } = props

  const data = useFragment(Fragment, categoryQuery)

  if (data.bannerMedia == null || data.bannerMedia.__typename === 'RawMedia') {
    return (
      <CoverImage>
        <RandomPattern seed={data.id} />
      </CoverImage>
    )
  }

  return (
    <ThumbnailMedia mediaQuery={data.bannerMedia} />
  )
}
