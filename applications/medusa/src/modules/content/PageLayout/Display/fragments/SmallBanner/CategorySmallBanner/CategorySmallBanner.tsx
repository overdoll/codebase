import { graphql } from 'react-relay'
import { CategorySmallBannerFragment$key } from '@//:artifacts/CategorySmallBannerFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import CoverImage
  from '../../../../../HookedComponents/Media/components/ImageContainer/ImageWrapper/CoverImage/CoverImage'
import RandomPattern from '../../../components/RandomPattern/RandomPattern'
import SmallBannerMedia from '../../../../../HookedComponents/Media/fragments/SmallBannerMedia/SmallBannerMedia'

const Fragment = graphql`
  fragment CategorySmallBannerFragment on Category {
    id
    bannerMedia {
      __typename
      ...SmallBannerMediaFragment
    }
  }
`

interface Props {
  categoryQuery: CategorySmallBannerFragment$key
}

export default function CategorySmallBanner (props: Props): JSX.Element {
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
    <SmallBannerMedia mediaQuery={data.bannerMedia} />
  )
}
