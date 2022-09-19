import { graphql } from 'react-relay'
import type { CategoryBannerFragment$key } from '@//:artifacts/CategoryBannerFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { ThumbnailMedia } from '../../../../../HookedComponents/Media'
import CoverImage
  from '../../../../../HookedComponents/Media/components/ImageContainer/ImageWrapper/CoverImage/CoverImage'
import RandomPattern from '../../../components/RandomPattern/RandomPattern'

const Fragment = graphql`
  fragment CategoryBannerFragment on Category {
    id
    bannerMedia {
      ...ThumbnailMediaFragment
    }
  }
`

interface Props {
  categoryQuery: CategoryBannerFragment$key
}

export default function CategoryBanner (props: Props): JSX.Element {
  const {
    categoryQuery
  } = props

  const data = useFragment(Fragment, categoryQuery)

  if (data.bannerMedia == null) {
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
