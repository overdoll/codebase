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
    swiper.on('activeIndexChange', (swiper) => {
      setActiveIndex(swiper.activeIndex)
    })
    return () => {
      swiper.off('activeIndexChange')
    }
  })

  useUpdateEffect(() => {
    if (activeIndex !== 0) {
      swiper.slideTo(slide ?? 0, 50)
    }
  }, [data.reference])

  if (slidesCount <= 1) {
    return <></>
  }

  return (
    <HStack
      position='absolute'
      bottom={0}
      zIndex={1}
      w='100%'
      py={1}
      spacing={1}
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
            w={isActive ? 2 : 1}
            h={isActive ? 2 : 1}
            bg={isSupporterOnly ? 'orange.400' : 'gray.50'}
            borderWidth={1}
            borderColor={isSupporterOnly ? 'orange.50' : 'gray.500'}
            borderRadius='md'
          />
        )
      })}
    </HStack>
  )
}
