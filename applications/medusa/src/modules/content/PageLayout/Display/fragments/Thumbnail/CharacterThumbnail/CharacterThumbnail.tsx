import { graphql } from 'react-relay'
import type { CharacterThumbnailFragment$key } from '@//:artifacts/CharacterThumbnailFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { ThumbnailMedia } from '../../../../../HookedComponents/Media'
import CoverImage
  from '../../../../../HookedComponents/Media/components/ImageContainer/ImageWrapper/CoverImage/CoverImage'
import RandomPattern from '../../../components/RandomPattern/RandomPattern'

const Fragment = graphql`
  fragment CharacterThumbnailFragment on Character {
    id
    bannerMedia {
      __typename
      ...ThumbnailMediaFragment
    }
  }
`

interface Props {
  characterQuery: CharacterThumbnailFragment$key
}

export default function CharacterThumbnail (props: Props): JSX.Element {
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
