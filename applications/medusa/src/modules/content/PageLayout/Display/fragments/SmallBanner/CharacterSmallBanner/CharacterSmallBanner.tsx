import { graphql } from 'react-relay'
import { CharacterSmallBannerFragment$key } from '@//:artifacts/CharacterSmallBannerFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import CoverImage
  from '../../../../../HookedComponents/Media/components/ImageContainer/ImageWrapper/CoverImage/CoverImage'
import RandomPattern from '../../../components/RandomPattern/RandomPattern'
import { ThumbnailMedia } from '../../../../../HookedComponents/Media'

const Fragment = graphql`
  fragment CharacterSmallBannerFragment on Character {
    id
    bannerMedia {
      __typename
      ...ThumbnailMediaFragment
    }
  }
`

interface Props {
  characterQuery: CharacterSmallBannerFragment$key
}

export default function CharacterSmallBanner (props: Props): JSX.Element {
  const {
    characterQuery
  } = props

  const data = useFragment(Fragment, characterQuery)

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
