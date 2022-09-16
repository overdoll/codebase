import { RawCinematicGalleryFragment$key } from '@//:artifacts/RawCinematicGalleryFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { Swiper, SwiperSlide } from 'swiper/react'
import { GALLERY_PROPS, SLIDE_PROPS } from '../../../constants'
import { OnSwiperInitType } from '../../../types'
import { RawCinematicMedia } from '../../../../Media'
import PreviewSlide from '../../../components/PreviewSlide/PreviewSlide'

interface Props {
  postQuery: RawCinematicGalleryFragment$key
  onSwiper?: OnSwiperInitType
}

const PostFragment = graphql`
  fragment RawCinematicGalleryFragment on Post {
    id
    content {
      id
      media {
        ...RawCinematicMediaFragment
      }
    }
  }
`

export default function RawCinematicGallery (props: Props): JSX.Element {
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
    >
      {postData.content.map((content) =>
        <SwiperSlide
          key={content.id}
          {...SLIDE_PROPS}
        >
          {({ isActive }) => (
            <PreviewSlide>
              <RawCinematicMedia
                mediaQuery={content.media}
                isActive={isActive}
              />
            </PreviewSlide>
          )}
        </SwiperSlide>)}
    </Swiper>
  )
}
