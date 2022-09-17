import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenBackgroundFragment$key } from '@//:artifacts/RouletteScreenBackgroundFragment.graphql'
import { graphql } from 'react-relay'
import VideoBackground
  from '@//:modules/content/HookedComponents/Media/components/VideoContainer/VideoBackground/VideoBackground'
import BackgroundPosterImageMedia
  from '@//:modules/content/HookedComponents/Media/fragments/Media/BackgroundPosterImageMedia/BackgroundPosterImageMedia'
import { StaticImageCover } from '@//:modules/content/HookedComponents/Media'

interface Props {
  query: RouletteScreenBackgroundFragment$key

}

const Fragment = graphql`
  fragment RouletteScreenBackgroundFragment on Post {
    content {
      media {
        __typename
        ...on VideoMedia {
          cover {
            ...BackgroundPosterImageMediaFragment
          }
        }
        ...on ImageMedia {
          ...BackgroundPosterImageMediaFragment
        }
      }
    }
  }
`

export default function RouletteScreenBackground (props: Props): JSX.Element {
  const {
    query
  } = props

  const data = useFragment(Fragment, query)

  if (data.content[0].media.__typename === 'VideoMedia') {
    return (
      <VideoBackground poster={<BackgroundPosterImageMedia imageMediaQuery={data.content[0].media.cover} />} />
    )
  }

  if (data.content[0].media.__typename === 'ImageMedia') {
    return (
      <VideoBackground poster={<BackgroundPosterImageMedia imageMediaQuery={data.content[0].media} />} />
    )
  }

  return (
    <VideoBackground poster={<StaticImageCover url='https://static.dollycdn.net/banners/roulette-banner.jpg' />} />
  )
}
