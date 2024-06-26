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
import { UrlObject } from 'url'
import { Link } from '../../../../../../routing'
import MemoKey from '../../../components/PaginationScroller/MemoKey/MemoKey'

interface Props {
  postQuery: PreviewPostFragment$key
}

const PostFragment = graphql`
  fragment PreviewPostFragment on Post {
    id
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
      <MemoKey memoKey={postData.id}>
        <PreviewContent onPlayerInit={setPlayer} onSwiper={setSwiper} postQuery={postData} />
      </MemoKey>
      <PreviewFooter mt={1} postQuery={postData} />
    </Box>
  )
}
