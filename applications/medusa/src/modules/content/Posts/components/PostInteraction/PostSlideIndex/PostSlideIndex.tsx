import { Flex, HStack } from '@chakra-ui/react'
import { graphql } from 'react-relay'
import { PostSlideIndexFragment$key } from '@//:artifacts/PostSlideIndexFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { useSwiper } from 'swiper/react'
import { useEffect, useState } from 'react'
import { useUpdateEffect } from 'usehooks-ts'
import { NumberParam, useQueryParam } from 'use-query-params'

interface Props {
  query: PostSlideIndexFragment$key
}

const Fragment = graphql`
  fragment PostSlideIndexFragment on Post {
    reference
    content {
      isSupporterOnly
    }
  }
`

export default function PostSlideIndex ({
  query,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const swiper = useSwiper()

  const [slide] = useQueryParam<number | null | undefined>('slide', NumberParam)

  const [activeIndex, setActiveIndex] = useState(slide ?? swiper.activeIndex)

  const slidesCount = data.content.length

  useEffect(() => {
    if (swiper != null && !swiper.destroyed) {
      swiper.on('slideChange', (swiper) => {
        setActiveIndex(swiper.activeIndex)
      })
    }
    return () => {
      swiper.off('slideChange')
    }
  }, [swiper])

  useUpdateEffect(() => {
    if (swiper == null) return
    if (activeIndex !== 0) {
      swiper.slideTo(slide ?? 0, 50)
    }
  }, [data.reference, swiper])

  if (slidesCount <= 1) {
    return <></>
  }

  return (
    <HStack
      w='100%'
      pt={2}
      px={1}
      spacing={2}
      align='center'
      justify='center'
      {...rest}
    >
      {data.content.map((item, contentIndex) => {
        const isActive = contentIndex === activeIndex
        const isSupporterOnly = item.isSupporterOnly

        return (
          <Flex
            key={contentIndex}
            w={`${100 / slidesCount}%`}
            h={1}
            bg={!isSupporterOnly ? (isActive ? 'gray.200' : 'gray.50') : (isActive ? 'orange.300' : 'gray.50')}
            borderRadius='md'
          />
        )
      })}
    </HStack>
  )
}
