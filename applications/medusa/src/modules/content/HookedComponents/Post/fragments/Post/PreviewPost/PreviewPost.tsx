import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PreviewPostFragment$key } from '@//:artifacts/PreviewPostFragment.graphql'
import { Box } from '@chakra-ui/react'
import { PreviewContent } from '../../../../../HookedComponents/Post'
import PreviewHeader from '../PreviewHeader/PreviewHeader'
import PreviewFooter from '../PreviewFooter/PreviewFooter'
import { useEffect, useRef, useState } from 'react'
import SwiperType from 'swiper'
import { PlayerType } from '../../../../Media/types'
import trackFathomEvent from '../../../../../../support/trackFathomEvent'
import { UrlObject } from 'url'
import { Link } from '../../../../../../routing'

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
  const boxRef = useRef<HTMLAnchorElement & HTMLDivElement | null>(null)

  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [player, setPlayer] = useState<PlayerType | null>(null)

  const defaultLink = {
    pathname: '/[slug]/post/[reference]',
    query: {
      slug: postData.club.slug,
      reference: postData.reference,
      ...(swiper != null && swiper?.activeIndex !== 0 && ({ slide: swiper.activeIndex })),
      ...(player != null && player?.currentTime >= 5 && ({ time: player.currentTime.toFixed(0) }))
    }
  }

  const [href, setHref] = useState<UrlObject>(defaultLink)

  const onClick = (): void => {
    trackFathomEvent('QVSNTJRX', 1)
  }

  useEffect(() => {
    const onMouseEnter = (): void => {
      setHref({
        pathname: '/[slug]/post/[reference]',
        query: {
          slug: postData.club.slug,
          reference: postData.reference,
          ...(swiper != null && swiper?.activeIndex !== 0 && ({ slide: swiper.activeIndex })),
          ...(player != null && player?.currentTime >= 5 && ({ time: player.currentTime.toFixed(0) }))
        }
      })
    }

    boxRef.current?.addEventListener('mouseenter', onMouseEnter)
    return () => {
      boxRef.current?.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [boxRef])

  return (
    <Box position='relative'>
      <Link
        passHref
        href={href}
      >
        <Box
          ref={boxRef}
          onClick={onClick}
          as='a'
          position='absolute'
          top={0}
          bottom={0}
          left={0}
          right={0}
          cursor='pointer'
        />
      </Link>
      <PreviewHeader mb={1} postQuery={postData} />
      <PreviewContent onPlayerInit={setPlayer} onSwiper={setSwiper} postQuery={postData} />
      <PreviewFooter mt={1} postQuery={postData} />
    </Box>
  )
}
