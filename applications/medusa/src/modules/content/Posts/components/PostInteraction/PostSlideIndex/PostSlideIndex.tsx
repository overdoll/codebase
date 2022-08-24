import { Flex, Grid, GridItem } from '@chakra-ui/react'
import { graphql } from 'react-relay'
import { PostSlideIndexFragment$key } from '@//:artifacts/PostSlideIndexFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { useEffect, useState } from 'react'
import { useUpdateEffect } from 'usehooks-ts'
import { NumberParam, useQueryParam } from 'use-query-params'
import SwiperType from 'swiper'
import ImageSnippet from '../../../../DataDisplay/ImageSnippet/ImageSnippet'
import VideoSnippet from '../../../../DataDisplay/VideoSnippet/VideoSnippet'
import ClickableTile from '../../../../ContentSelection/ClickableTile/ClickableTile'
import { Icon } from '../../../../PageLayout'
import { ControlPlayButton } from '@//:assets/icons'

interface Props {
  query: PostSlideIndexFragment$key
  swiper: SwiperType | null
  fillHeight?: boolean
}

const Fragment = graphql`
  fragment PostSlideIndexFragment on Post {
    reference
    content {
      isSupporterOnly
      resource {
        type
        ...ImageSnippetFragment
        ...VideoSnippetFragment
      }
    }
  }
`

export default function PostSlideIndex ({
  query,
  swiper,
  fillHeight = false
}: Props): JSX.Element {
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
    if (swiper == null) return
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
      h={fillHeight ? '100%' : (slidesCount > 10 ? 24 : 12)}
      gap={1}
      templateColumns={slidesCount > 10 ? 'repeat(10, 1fr)' : `repeat(${slidesCount}, 1fr)`}
      templateRows={slidesCount > 10 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'}
    >
      {data.content.map((item, contentIndex) => {
        const isActive = contentIndex === activeIndex
        const isSupporterOnly = item.isSupporterOnly

        const DisplayMedia = (): JSX.Element => {
          switch (item.resource.type) {
            case 'IMAGE':
              return (
                <ImageSnippet
                  keepWidth
                  cover
                  tinyError
                  query={item.resource}
                />
              )
            case 'VIDEO':
              return (
                <VideoSnippet query={item.resource} />
              )
            default:
              return <></>
          }
        }
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
                borderColor={!isSupporterOnly ? (isActive ? 'primary.400' : 'gray.50') : (isActive ? 'orange.300' : 'gray.50')}
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
                <DisplayMedia />
              </Flex>
            </ClickableTile>
          </GridItem>
        )
      })}
    </Grid>
  )
}
