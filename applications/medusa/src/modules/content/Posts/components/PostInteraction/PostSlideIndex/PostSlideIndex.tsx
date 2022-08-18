import { Flex, HStack } from '@chakra-ui/react'
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

interface Props {
  query: PostSlideIndexFragment$key
  swiper: SwiperType | null
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
  ...rest
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
    <HStack
      w='100%'
      pt={2}
      spacing={2}
      align='center'
      justify='center'
      {...rest}
    >
      {data.content.map((item, contentIndex) => {
        const isActive = contentIndex === activeIndex
        const isSupporterOnly = item.isSupporterOnly

        const DisplayMedia = (): JSX.Element => {
          switch (item.resource.type) {
            case 'IMAGE':
              return <ImageSnippet tinyError query={item.resource} />
            case 'VIDEO':
              return (
                <VideoSnippet query={item.resource} />
              )
            default:
              return <></>
          }
        }

        return (
          <ClickableTile
            isDisabled={swiper == null}
            onClick={() => swiper?.slideTo(contentIndex, 50)}
            borderRadius='md'
            w={`${100 / slidesCount}%`}
            key={contentIndex}
          >
            <Flex
              w='100%'
              h={12}
              borderWidth={isActive ? 2 : 0}
              borderColor={!isSupporterOnly ? (isActive ? 'primary.400' : 'gray.50') : (isActive ? 'orange.300' : 'gray.50')}
              borderRadius='inherit'
              overflow='hidden'
            >
              <DisplayMedia />
            </Flex>
          </ClickableTile>
        )
      })}
    </HStack>
  )
}
