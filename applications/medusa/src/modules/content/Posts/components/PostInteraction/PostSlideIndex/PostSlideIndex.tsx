import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { graphql } from 'react-relay'
import { PostSlideIndexFragment$key } from '@//:artifacts/PostSlideIndexFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { useEffect, useState } from 'react'
import { useUpdateEffect } from 'usehooks-ts'
import { NumberParam, useQueryParam } from 'use-query-params'
import SwiperType from 'swiper'
import ClickableTile from '../../../../ContentSelection/ClickableTile/ClickableTile'
import { Icon } from '../../../../PageLayout'
import { ControlPlayButton } from '@//:assets/icons'
import PostSlideIndexMedia from './PostSlideIndexMedia/PostSlideIndexMedia'

interface Props {
  query: PostSlideIndexFragment$key
  swiper: SwiperType | null
  fillHeight?: boolean
  disableSlideIndexing?: boolean
}

const Fragment = graphql`
  fragment PostSlideIndexFragment on Post {
    reference
    content {
      isSupporterOnly
      resource {
        type
      }
      ...PostSlideIndexMediaFragment
    }
  }
`

export default function PostSlideIndex (props: Props): JSX.Element {
  const {
    query,
    swiper,
    fillHeight = false,
    disableSlideIndexing = false
  } = props

  const data = useFragment(Fragment, query)

  const [slide] = useQueryParam<number | null | undefined>('slide', NumberParam)

  const [activeIndex, setActiveIndex] = useState(slide ?? swiper?.activeIndex ?? -1)

  const slidesCount = data.content.length

  useEffect(() => {
    if (swiper == null) return
    if (!swiper.destroyed) {
      swiper.on('slideChange', (swiper) => {
        setActiveIndex(swiper.activeIndex)
      })
      setActiveIndex(swiper.activeIndex)
    }
    return () => {
      swiper.off('slideChange')
    }
  }, [swiper])

  useUpdateEffect(() => {
    if (swiper == null || disableSlideIndexing) return
    if (activeIndex !== 0) {
      swiper.slideTo(slide ?? 0, 50)
    }
  }, [data.reference, swiper])

  if (slidesCount <= 1) {
    return <></>
  }

  return (
    <Grid
      alignItems='center'
      mt={fillHeight ? 0 : 2}
      w='100%'
      h={fillHeight ? '100%' : (slidesCount > 6 ? 24 : 12)}
      gap={1}
      templateColumns={slidesCount > 10 ? 'repeat(10, 1fr)' : `repeat(${slidesCount}, 1fr)`}
      templateRows={slidesCount > 6 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}
    >
      {data.content.map((item, contentIndex) => {
        const isActive = contentIndex === activeIndex
        const isSupporterOnly = item.isSupporterOnly

        return (
          <GridItem overflow='hidden' h='100%' w='100%' key={contentIndex}>
            <ClickableTile
              _active={{ boxShadow: 'none' }}
              _focus={{ boxShadow: 'none' }}
              isDisabled={swiper == null}
              onClick={() => swiper?.slideTo(contentIndex, 50)}
              borderRadius='md'
              h='100%'
              w='100%'
            >
              <Flex
                borderWidth={isActive ? 2 : 0}
                borderColor={!isSupporterOnly ? (isActive ? 'gray.00' : 'gray.50') : (isActive ? 'orange.300' : 'gray.50')}
                borderRadius='inherit'
                position='relative'
                w='100%'
                h='100%'
                overflow='hidden'
                align='center'
                justify='center'
                flexGrow={0}
              >
                {item.resource.type === 'VIDEO' && (
                  <Flex position='absolute' w='100%' h='100%' align='center' justify='center'>
                    <Icon icon={ControlPlayButton} w={3} h={3} fill='whiteAlpha.800' />
                  </Flex>
                )}
                <PostSlideIndexMedia query={item} />
              </Flex>
            </ClickableTile>
          </GridItem>
        )
      })}
    </Grid>
  )
}
