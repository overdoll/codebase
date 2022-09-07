import { graphql, useFragment } from 'react-relay'
import { VideoBackgroundFragment$key } from '@//:artifacts/VideoBackgroundFragment.graphql'
import { Flex, FlexProps } from '@chakra-ui/react'

interface Props extends FlexProps {
  query: VideoBackgroundFragment$key
}

const Fragment = graphql`
  fragment VideoBackgroundFragment on Resource {
    videoThumbnail {
      url
    }
  }
`

export default function VideoBackground ({
  query,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <Flex
      left='50%'
      w='10%'
      h='10%'
      transform='scale(11)'
      top='50%'
      opacity={0.5}
      bg='center center / cover no-repeat'
      backgroundImage={data.videoThumbnail?.url ?? ''}
      filter='blur(2px)'
      position='absolute'
      {...rest}
    />
  )
}
