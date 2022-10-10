import { RouletteGalleryFragment$key } from '@//:artifacts/RouletteGalleryFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { Swiper, SwiperSlide } from 'swiper/react'
import { GALLERY_PROPS, SLIDE_PROPS } from '../../../constants'
import { OnSwiperInitType } from '../../../types'
import CinematicSlide from '../../../components/CinematicSlide/CinematicSlide'
import RouletteMedia from '../../../../Media/fragments/RouletteMedia/RouletteMedia'
import SupporterSlide from '../SupporterSlide/SupporterSlide'

interface Props {
  postQuery: RouletteGalleryFragment$key
  onSwiper?: OnSwiperInitType
}

const PostFragment = graphql`
  fragment RouletteGalleryFragment on Post {
    id
    content {
      id
      media {
        ...RouletteMediaFragment
      }
      ...SupporterSlideFragment
    }
    ...SupporterSlidePostFragment
  }
`

export default function RouletteGallery (props: Props): JSX.Element {
  const {
    postQuery,
    onSwiper
  } = props

  const postData = useFragment(PostFragment, postQuery)

  const onInit: OnSwiperInitType = (swiper) => {
    onSwiper?.(swiper)
  }

  return (
    <Swiper
      key={postData.id}
      onSwiper={onInit}
      {...GALLERY_PROPS}
      style={{
        height: '100%'
      }}
    >
      {postData.content.map((content) =>
        <SwiperSlide
          key={content.id}
          {...SLIDE_PROPS}
        >
          {({ isActive }) => (
            <CinematicSlide>
              <SupporterSlide
                postContentQuery={content}
                postQuery={postData}
                isActive={isActive}
              >
                <RouletteMedia
                  mediaQuery={content.media}
                  observerProps={{
                    isActive
                  }}
                />
              </SupporterSlide>
            </CinematicSlide>
          )}
        </SwiperSlide>)}
    </Swiper>
  )
}
