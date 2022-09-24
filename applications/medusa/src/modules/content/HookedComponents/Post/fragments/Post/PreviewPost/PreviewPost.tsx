import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PreviewPostFragment$key } from '@//:artifacts/PreviewPostFragment.graphql'
import { Box } from '@chakra-ui/react'
import { PreviewContent } from '../../../../../HookedComponents/Post'
import PreviewHeader from '../PreviewHeader/PreviewHeader'
import PreviewFooter from '../PreviewFooter/PreviewFooter'
import { useState } from 'react'
import SwiperType from 'swiper'
import { PlayerType } from '../../../../Media/types'
import trackFathomEvent from '../../../../../../support/trackFathomEvent'
import { useRouter } from 'next/router'

interface Props {
  postQuery: PreviewPostFragment$key
}

const PostFragment = graphql`
  fragment PreviewPostFragment on Post {
    reference
    club {
      slug
    }
    ...PreviewHeaderFragment
    ...PreviewContentFragment
    ...PreviewFooterFragment
  }
`

export default function PreviewPost (props: Props): JSX.Element {
  const { postQuery } = props

  const postData = useFragment(PostFragment, postQuery)

  const router = useRouter()

  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [player, setPlayer] = useState<PlayerType | null>(null)

  // we bind the click of the post to a function as opposed to a link itself because
  // the currentTime and activeIndex values don't update otherwise.
  const onClick = (): void => {
    void router.push({
      pathname: '/[slug]/post/[reference]',
      query: {
        slug: postData.club.slug,
        reference: postData.reference,
        ...(swiper != null && swiper?.activeIndex !== 0 && ({ slide: swiper.activeIndex })),
        ...(player != null && player?.currentTime >= 5 && ({ time: player.currentTime.toFixed(0) }))
      }
    })
    trackFathomEvent('QVSNTJRX', 1)
  }

  // syncSwiperSlideChange(swiper, (swiper) => setActiveIndex(swiper.activeIndex))
  // syncPlayerTimeUpdate(player, (time) => setCurrentTime(time))

  return (
    <Box position='relative'>
      <Box onClick={onClick} position='absolute' top={0} bottom={0} left={0} right={0} cursor='pointer' />
      <PreviewHeader mb={1} postQuery={postData} />
      <PreviewContent onPlayerInit={setPlayer} onSwiper={setSwiper} postQuery={postData} />
      <PreviewFooter mt={1} postQuery={postData} />
    </Box>
  )
}
