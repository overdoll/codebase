import { Flex, GridItem } from '@chakra-ui/react'
import SwiperType from 'swiper'
import { ClickableTile } from '../../../../ContentSelection'
import { ReactNode, useEffect, useState } from 'react'
import syncSwiperSlideChange from '../../support/syncSwiperSlideChange'

interface Props {
  swiper: SwiperType | null
  index: number
  children: ReactNode
  isSupporter: boolean
}

export default function CarouselGridItem (props: Props): JSX.Element {
  const {
    swiper,
    index,
    children,
    isSupporter
  } = props

  const [activeIndex, setActiveIndex] = useState(0)

  const isActive = index === activeIndex

  syncSwiperSlideChange(swiper, (swiper) => setActiveIndex(swiper.activeIndex))

  useEffect(() => {
    if (swiper == null) return
    if (swiper.activeIndex !== 0) {
      setActiveIndex(swiper.activeIndex)
    }
  }, [swiper])

  return (
    <GridItem overflow='hidden' w='100%'>
      <ClickableTile
        _active={{ boxShadow: 'none' }}
        _focus={{ boxShadow: 'none' }}
        isDisabled={swiper == null}
        onClick={() => swiper?.slideTo(index, 50)}
        borderRadius='2px'
        position='relative'
        h='100%'
        w='100%'
      >
        <Flex
          borderWidth={isActive ? '1.5px' : 0}
          borderColor={isActive ? (isSupporter ? 'orange.300' : 'gray.00') : 'gray.50'}
          borderRadius='inherit'
          position='relative'
          w='100%'
          h='100%'
          overflow='hidden'
          align='center'
          justify='center'
          flexGrow={0}
        >
          {children}
        </Flex>
      </ClickableTile>
    </GridItem>
  )
}
