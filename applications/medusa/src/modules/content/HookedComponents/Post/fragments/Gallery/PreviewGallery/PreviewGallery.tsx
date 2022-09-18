import { PreviewGalleryFragment$key } from '@//:artifacts/PreviewGalleryFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { Swiper, SwiperSlide } from 'swiper/react'
import { GALLERY_PROPS, SLIDE_PROPS } from '../../../constants'
import { OnSwiperInitType } from '../../../types'
import { PreviewMedia } from '../../../../Media'
import SupporterSlide from '../SupporterSlide/SupporterSlide'
import PreviewSlide from '../../../components/PreviewSlide/PreviewSlide'

interface Props {
  postQuery: PreviewGalleryFragment$key
  onSwiper?: OnSwiperInitType
}

const PostFragment = graphql`
  fragment PreviewGalleryFragment on Post {
    id
    content {
      id
      media {
        ...PreviewMediaFragment
      }
      ...SupporterSlideFragment
    }
    ...SupporterSlidePostFragment
  }
`

export default function PreviewGallery (props: Props): JSX.Element {
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
              <SupporterSlide
                postContentQuery={content}
                postQuery={postData}
              >
                <PreviewMedia
                  mediaQuery={content.media}
                  observerProps={{
                    isActive
                  }}
                />
              </SupporterSlide>
            </PreviewSlide>
          )}
        </SwiperSlide>)}
    </Swiper>
  )
}
