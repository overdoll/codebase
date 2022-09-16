import { SwiperProps, SwiperSlideProps } from 'swiper/react'

export const POST_SWIPER_PROPS: SwiperProps = {
  grabCursor: true,
  spaceBetween: 20,
  touchRatio: 3,
  resistanceRatio: 0.5,
  speed: 100,
  longSwipesMs: 700
}

export const POST_SWIPER_SLIDE_PROPS: SwiperSlideProps = {
  style: {
    height: 'auto',
    alignSelf: 'stretch'
  }
}
