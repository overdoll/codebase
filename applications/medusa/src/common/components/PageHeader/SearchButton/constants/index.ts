import { SwiperProps } from 'swiper/react'
import { ArrayParam, StringParam } from 'serialize-query-params'

export const SEARCH_SWIPER_PROPS: SwiperProps = {
  slidesPerView: 'auto',
  spaceBetween: 10,
  speed: 150,
  touchRatio: 3,
  resistanceRatio: 0.5,
  style: { overflow: 'visible' }
}

export const SEARCH_SLIDE_HEIGHT = {
  base: 190
}

export const SEARCH_SLIDE_WIDTH = {
  base: 150
}

export const configMap = {
  sort: StringParam,
  supporter: ArrayParam
}

export interface SearchProps {
  supporterOnlyStatus?: string[] | null
  sortBy: string
}
