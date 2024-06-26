import { graphql } from 'react-relay'
import type { RawPostContentBannerFragment$key } from '@//:artifacts/RawPostContentBannerFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { BannerMedia } from '../../../../Media'
import ProcessingRawMedia from '../../../../Media/fragments/Media/ProcessingRawMedia/ProcessingRawMedia'
import ContainImage from '../../../../Media/components/ImageContainer/ImageWrapper/ContainImage/ContainImage'

const Fragment = graphql`
  fragment RawPostContentBannerFragment on PostContent {
    media {
      __typename
      ...BannerMediaFragment
      ...ProcessingRawMediaFragment
    }
  }
`

interface Props {
  postContentQuery: RawPostContentBannerFragment$key
}

export default function RawPostContentBanner (props: Props): JSX.Element {
  const {
    postContentQuery
  } = props

  const data = useFragment(Fragment, postContentQuery)

  if (data.media.__typename === 'RawMedia') {
    return (
      <ContainImage>
        <ProcessingRawMedia rawMediaQuery={data.media} />
      </ContainImage>
    )
  }

  return (
    <BannerMedia mediaQuery={data.media} />
  )
}
