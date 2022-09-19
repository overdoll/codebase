import { graphql } from 'react-relay'
import type { CharacterBannerFragment$key } from '@//:artifacts/CharacterBannerFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { ThumbnailMedia } from '../../../../../HookedComponents/Media'
import CoverImage
  from '../../../../../HookedComponents/Media/components/ImageContainer/ImageWrapper/CoverImage/CoverImage'
import RandomPattern from '../../../components/RandomPattern/RandomPattern'

const Fragment = graphql`
  fragment CharacterBannerFragment on Character {
    id
    bannerMedia {
      ...ThumbnailMediaFragment
    }
  }
`

interface Props {
  characterQuery: CharacterBannerFragment$key
}

export default function CharacterBanner (props: Props): JSX.Element {
  const {
    characterQuery
  } = props

  const data = useFragment(Fragment, characterQuery)

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
