import { graphql } from 'react-relay'
import type { ClubBannerFragment$key } from '@//:artifacts/ClubBannerFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { BannerMedia } from '../../../../../HookedComponents/Media'
import CoverImage
  from '../../../../../HookedComponents/Media/components/ImageContainer/ImageWrapper/CoverImage/CoverImage'
import RandomPattern from '../../../components/RandomPattern/RandomPattern'

const Fragment = graphql`
  fragment ClubBannerFragment on Club {
    id
    bannerMedia {
      __typename
      ...BannerMediaFragment
    }
  }
`

interface Props {
  clubQuery: ClubBannerFragment$key
}

export default function ClubBanner (props: Props): JSX.Element {
  const {
    clubQuery
  } = props

  const data = useFragment(Fragment, clubQuery)

  console.log(data)

  if (data.bannerMedia == null || data.bannerMedia.__typename === 'RawMedia') {
    return (
      <CoverImage>
        <RandomPattern seed={data.id} />
      </CoverImage>
    )
  }

  return (
    <BannerMedia mediaQuery={data.bannerMedia} />
  )
}
