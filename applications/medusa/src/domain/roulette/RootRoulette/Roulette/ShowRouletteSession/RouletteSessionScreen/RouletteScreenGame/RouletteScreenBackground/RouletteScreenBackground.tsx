import { useFragment } from 'react-relay/hooks'
import type { RouletteScreenBackgroundFragment$key } from '@//:artifacts/RouletteScreenBackgroundFragment.graphql'
import { graphql } from 'react-relay'
import BlurredBackgroundThumbnail from '@//:common/components/BlurredBackgroundThumbnail/BlurredBackgroundThumbnail'

interface Props {
  query: RouletteScreenBackgroundFragment$key

}

const Fragment = graphql`
  fragment RouletteScreenBackgroundFragment on Post {
    content {
      resource {
        type
        urls {
          url
          mimeType
        }
        videoThumbnail {
          url
        }
        preview
      }
    }
  }
`

export default function RouletteScreenBackground (props: Props): JSX.Element {
  const {
    query
  } = props

  const data = useFragment(Fragment, query)

  const thumbnailUrl = data.content[0].resource.type === 'VIDEO'
    ? (data.content[0].resource.videoThumbnail?.url ?? '')
    : (data.content[0].resource.urls.filter((item) => item.mimeType === 'image/jpeg')[0]?.url ?? '')

  const backgroundColor = data.content[0].resource.preview ?? ''

  return (
    <BlurredBackgroundThumbnail
      backgroundImage={thumbnailUrl ?? '/banners/roulette-banner.jpg'}
      backgroundColor={backgroundColor}
    />
  )
}
