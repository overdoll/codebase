import { graphql } from 'react-relay'
import type { ThumbnailCarouseItemFragment$key } from '@//:artifacts/ThumbnailCarouseItemFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { ThumbnailMedia } from '../../../../Media'
import { Flex } from '@chakra-ui/react'
import { Icon } from '../../../../../PageLayout'
import { ControlPlayButton, PremiumStar } from '@//:assets/icons'
import { ThumbnailImageMediaProps } from '../../../../Media/fragments/Media/ThumbnailImageMedia/ThumbnailImageMedia'

const Fragment = graphql`
  fragment ThumbnailCarouseItemFragment on Media {
    ...ThumbnailMediaFragment
    __typename
  }
`

interface Props extends ThumbnailImageMediaProps {
  mediaQuery: ThumbnailCarouseItemFragment$key
  isSupporter: boolean
}

export default function ThumbnailCarouseItem (props: Props): JSX.Element {
  const {
    mediaQuery,
    imageProps,
    isSupporter
  } = props

  const data = useFragment(Fragment, mediaQuery)

  return (
    <>
      <ThumbnailMedia mediaQuery={data} imageProps={imageProps} />
      {isSupporter && (
        <Flex position='absolute' w='100%' h='100%' align='center' justify='center'>
          <Icon icon={PremiumStar} w={4} h={4} fill='orange.300' />
        </Flex>
      )}
      {(data.__typename === 'VideoMedia' && !isSupporter) && (
        <Flex position='absolute' w='100%' h='100%' align='center' justify='center'>
          <Icon icon={ControlPlayButton} w={4} h={4} fill='whiteAlpha.800' />
        </Flex>
      )}
    </>
  )
}
