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

  if (data.bannerMedia == null) {
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
