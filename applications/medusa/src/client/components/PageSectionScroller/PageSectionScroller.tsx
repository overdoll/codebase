import { Swiper, SwiperSlide } from 'swiper/react'
import { ReactNode, useState } from 'react'
import { Box, Flex, Tab, TabList, Tabs } from '@chakra-ui/react'
import SwiperCore from 'swiper'

interface Props {
  children: ReactNode
  pageInfiniteScroll: ReactNode
  childrenTitle: ReactNode
  infiniteScrollTitle: ReactNode
  reversed?: boolean
}

export default function PageSectionScroller ({
  children,
  pageInfiniteScroll,
  childrenTitle,
  infiniteScrollTitle,
  reversed = false
}: Props): JSX.Element {
  const [swiper, setSwiper] = useState<SwiperCore | null>(null)

  const [index, setIndex] = useState(0)

  const onChangeTab = (index): void => {
    setIndex(index)
    if (swiper == null) return
    swiper.slideTo(index, 300)
  }

  const ChildTab = (): JSX.Element => <Tab color='gray.100' borderRadius='full'>
    {childrenTitle != null ? childrenTitle : 'children'}
  </Tab>

  const ScrollTab = (): JSX.Element => <Tab color='gray.100' borderRadius='full'>
    {infiniteScrollTitle != null ? infiniteScrollTitle : 'infinite-scroll'}
  </Tab>

  const SwiperControl = (): JSX.Element => {
    return (
      <Flex
        align='center'
        justify='center'
        w='100%'
        zIndex='docked'
        position='absolute'
        bottom={1}
      >
        <Box boxShadow='lg' borderRadius='full' bg='dimmers.500' py={2} px={1}>
          <Tabs
            index={index}
            onChange={onChangeTab}
            size='sm'
            variant='soft-rounded'
            colorScheme='primary'
          >
            <TabList>
              {reversed
                ? <>
                  <ScrollTab />
                  <ChildTab />
                </>
                : <>
                  <ChildTab />
                  <ScrollTab />
                </>}
            </TabList>
          </Tabs>
        </Box>
      </Flex>
    )
  }

  return (
    <Box position='relative'>
      <Box>
        <Swiper
          onSwiper={(swiper) => setSwiper(swiper)}
          onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
          style={{
            height: '100%',
            overflow: 'visible'
          }}
          spaceBetween={20}
          simulateTouch={false}
          nested
          autoHeight
          resistanceRatio={0}
        >
          {reversed
            ? <>
              <SwiperSlide>
                {pageInfiniteScroll}
              </SwiperSlide>
              <SwiperSlide>
                <Box mt={6} mb={28}>
                  {children}
                </Box>
              </SwiperSlide>

            </>
            : <>
              <SwiperSlide>
                <Box mt={6} mb={16}>
                  {children}
                </Box>
              </SwiperSlide>
              <SwiperSlide>
                {pageInfiniteScroll}
              </SwiperSlide>
            </>}
        </Swiper>
      </Box>
      <SwiperControl />
    </Box>
  )
}
