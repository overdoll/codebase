import { Flex, GridItem } from '@chakra-ui/react'
import SwiperType from 'swiper'
import { ClickableTile } from '../../../../ContentSelection'
import { ReactNode } from 'react'

interface Props {
  swiper: SwiperType | null
  index: number
  children: ReactNode
}

export default function CarouselGridItem (props: Props): JSX.Element {
  const {
    swiper,
    index,
    children
  } = props

  const isActive = index === swiper?.activeIndex

  return (
    <GridItem overflow='hidden' h='100%' w='100%'>
      <ClickableTile
        _active={{ boxShadow: 'none' }}
        _focus={{ boxShadow: 'none' }}
        isDisabled={swiper == null}
        onClick={() => swiper?.slideTo(index, 50)}
        borderRadius='md'
        h='100%'
        w='100%'
      >
        <Flex
          borderWidth={isActive ? 2 : 0}
          borderColor={isActive ? 'gray.00' : 'gray.50'}
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
