import { graphql } from 'react-relay'
import type { InfoRawPostContentBannerFragment$key } from '@//:artifacts/InfoRawPostContentBannerFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import RawPostContentBanner from '../RawPostContentBanner/RawPostContentBanner'
import { Flex, Text } from '@chakra-ui/react'
import { Icon } from '../../../../../PageLayout'
import { ControlPlayButton, ControlVolumeMissing } from '@//:assets/icons'
import BannerImageMedia from '../../../../Media/fragments/Media/BannerImageMedia/BannerImageMedia'

const Fragment = graphql`
  fragment InfoRawPostContentBannerFragment on PostContent {
    media {
      __typename
      ...on VideoMedia {
        cover {
          ...BannerImageMediaFragment
        }
        hasAudio
        duration
      }
    }
    ...RawPostContentBannerFragment
  }
`

interface Props {
  postContentQuery: InfoRawPostContentBannerFragment$key
}

export default function InfoRawPostContentBanner (props: Props): JSX.Element {
  const {
    postContentQuery
  } = props

  const data = useFragment(Fragment, postContentQuery)

  if (data.media.__typename === 'VideoMedia') {
    return (
      <Flex top={0} bottom={0} right={0} left={0} position='absolute'>
        <BannerImageMedia imageMediaQuery={data.media.cover} />
        <Flex align='center' justify='center' position='absolute' top={0} bottom={0} right={0} left={0}>
          <Flex align='center' justify='center' p={2} borderRadius='lg' bg='dimmers.400'>
            <Icon
              fill='gray.00'
              icon={data.media.hasAudio ? ControlPlayButton : ControlVolumeMissing}
              w={4}
              h={4}
              flexShrink={0}
            />
            <Text ml={2} noOfLines={1} color='gray.00' fontSize='xs'>
              {(data.media.duration / 1000).toFixed(0)}s
            </Text>
          </Flex>
        </Flex>
      </Flex>
    )
  }

  return (
    <RawPostContentBanner postContentQuery={data} />
  )
}
