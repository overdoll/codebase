import { graphql } from 'react-relay'
import type { RawThumbnailCarouselItemFragment$key } from '@//:artifacts/RawThumbnailCarouselItemFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { RawThumbnailMedia } from '../../../../Media'
import { Flex } from '@chakra-ui/react'
import { Icon } from '../../../../../PageLayout'
import { ControlPlayButton } from '@//:assets/icons'

const Fragment = graphql`
  fragment RawThumbnailCarouselItemFragment on Media {
    ...RawThumbnailMediaFragment
    __typename
  }
`

interface Props {
  mediaQuery: RawThumbnailCarouselItemFragment$key
}

export default function RawThumbnailCarouselItem (props: Props): JSX.Element {
  const {
    mediaQuery
  } = props

  const data = useFragment(Fragment, mediaQuery)

  return (
    <>
      <RawThumbnailMedia mediaQuery={data} />
      {data?.__typename === 'VideoMedia' && (
        <Flex position='absolute' w='100%' h='100%' align='center' justify='center'>
          <Icon icon={ControlPlayButton} w={3} h={3} fill='whiteAlpha.800' />
        </Flex>
      )}
    </>
  )
}
