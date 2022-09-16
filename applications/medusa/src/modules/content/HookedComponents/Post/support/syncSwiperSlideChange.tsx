import { useEffect } from 'react'
import { OnSwiperInitType } from '../types'
import SwiperType from 'swiper'

export default function syncSwiperSlideChange (swiper: SwiperType | null, setSwiper?: OnSwiperInitType): void {
  useEffect(() => {
    if (swiper == null || swiper.destroyed) return

    const onSlideChange: OnSwiperInitType = (swiper) => {
      setSwiper?.(swiper)
    }

    swiper?.on('activeIndexChange', onSlideChange)
    return () => {
      swiper?.off('activeIndexChange', onSlideChange)
    }
  }, [swiper, setSwiper])
}
