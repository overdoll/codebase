import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PreviewPostFragment$key } from '@//:artifacts/PreviewPostFragment.graphql'
import { Box } from '@chakra-ui/react'
import { PreviewContent } from '../../../../../HookedComponents/Post'
import PreviewHeader from '../PreviewHeader/PreviewHeader'
import { Link } from '../../../../../../routing'
import PreviewFooter from '../PreviewFooter/PreviewFooter'
import { useState } from 'react'
import SwiperType from 'swiper'
import { PlayerType } from '../../../../Media/types'
import syncSwiperSlideChange from '../../../support/syncSwiperSlideChange'
import syncPlayerTimeUpdate from '../../../../Media/support/syncPlayerTimeUpdate'

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

  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [player, setPlayer] = useState<PlayerType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  syncSwiperSlideChange(swiper, (swiper) => setActiveIndex(swiper.activeIndex))
  syncPlayerTimeUpdate(player, (time) => setCurrentTime(time))

  return (
    <Box position='relative'>
      <Link
        passHref
        href={{
          pathname: '/[slug]/post/[reference]',
          query: {
            slug: postData.club.slug,
            reference: postData.reference,
            ...(activeIndex !== 0 && ({ slide: activeIndex })),
            ...(currentTime >= 5 && ({ time: currentTime.toFixed(0) }))
          }
        }}
      >
        <Box position='absolute' top={0} bottom={0} left={0} right={0} as='a' />
      </Link>
      <PreviewHeader mb={1} postQuery={postData} />
      <PreviewContent onPlayerInit={setPlayer} onSwiper={setSwiper} postQuery={postData} />
      <PreviewFooter mt={1} postQuery={postData} />
    </Box>
  )
}
