import { Flex, GridItem, useToken } from '@chakra-ui/react'
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

  const [orange, white] = useToken(
    'colors',
    ['orange.300', 'gray.00']
  )

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
        borderRadius='base'
        position='relative'
        h='100%'
        w='100%'
        p={isActive ? '1.5px' : 0}
      >
        <Flex
          borderWidth={isActive ? '2px' : 0}
          borderColor={isActive ? 'gray.900' : 'gray.50'}
          boxShadow={isActive ? (isSupporter ? `0 0 0 1.5px ${orange as string}` : `0 0 0 1.5px ${white as string}`) : 'none'}
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
