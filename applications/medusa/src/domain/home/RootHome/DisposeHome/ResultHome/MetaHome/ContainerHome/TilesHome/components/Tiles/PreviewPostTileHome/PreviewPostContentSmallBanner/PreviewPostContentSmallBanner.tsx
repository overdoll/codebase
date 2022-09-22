import { graphql } from 'react-relay'
import type {
  PreviewPostContentSmallBannerFragment$key
} from '@//:artifacts/PreviewPostContentSmallBannerFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Flex, Heading } from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { ControlPlayButton } from '@//:assets/icons'
import SmallBannerMedia from '@//:modules/content/HookedComponents/Media/fragments/SmallBannerMedia/SmallBannerMedia'
import formatSecondsIntoMinutes from '@//:modules/content/HookedComponents/Media/support/formatSecondsIntoMinutes'

const Fragment = graphql`
  fragment PreviewPostContentSmallBannerFragment on PostContent {
    media {
      __typename
      ...on VideoMedia {
        duration
      }
      ...SmallBannerMediaFragment
    }
  }
`

interface Props {
  postContentQuery: PreviewPostContentSmallBannerFragment$key
}

export default function PreviewPostContentSmallBanner (props: Props): JSX.Element {
  const {
    postContentQuery
  } = props

  const data = useFragment(Fragment, postContentQuery)

  if (data.media.__typename === 'ImageMedia') {
    return (
      <SmallBannerMedia mediaQuery={data.media} />
    )
  }

  if (data.media.__typename === 'VideoMedia') {
    return (
      <Flex top={0} bottom={0} right={0} left={0} position='absolute'>
        <SmallBannerMedia mediaQuery={data.media} />
        <Flex align='center' justify='center' position='absolute' top={0} bottom={0} right={0} left={0}>
          <Flex align='center' justify='center' p={2}>
            <Icon
              fill='gray.00'
              icon={ControlPlayButton}
              w={2}
              h={2}
              flexShrink={0}
            />
            <Heading ml={2} noOfLines={1} color='whiteAlpha.800' fontSize='xs'>
              {formatSecondsIntoMinutes(data?.media?.duration ?? 1 / 1000)}
            </Heading>
          </Flex>
        </Flex>
      </Flex>
    )
  }

  return <></>
}
