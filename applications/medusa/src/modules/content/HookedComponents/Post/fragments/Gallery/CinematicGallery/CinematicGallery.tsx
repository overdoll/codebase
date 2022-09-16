import { CinematicGalleryFragment$key } from '@//:artifacts/CinematicGalleryFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { Swiper, SwiperSlide } from 'swiper/react'
import { GALLERY_PROPS, SLIDE_PROPS } from '../../../constants'
import { OnSwiperInitType } from '../../../types'
import { CinematicMedia } from '../../../../Media'
import CinematicSlide from '../../../components/CinematicSlide/CinematicSlide'
import SupporterSlide from '../../SupporterSlide/SupporterSlide'
import { NumberParam, useQueryParam } from 'use-query-params'

interface Props {
  postQuery: CinematicGalleryFragment$key
  onSwiper?: OnSwiperInitType
}

const PostFragment = graphql`
  fragment CinematicGalleryFragment on Post {
    id
    content {
      id
      media {
        ...CinematicMediaFragment
      }
      ...SupporterSlideFragment
    }
    ...SupporterSlidePostFragment
  }
`

export default function CinematicGallery (props: Props): JSX.Element {
  const {
    postQuery,
    onSwiper
  } = props

  const postData = useFragment(PostFragment, postQuery)

  const onInit: OnSwiperInitType = (swiper) => {
    onSwiper?.(swiper)
  }

  const [slide] = useQueryParam<number | null | undefined>('slide', NumberParam)
  const [time] = useQueryParam<number | null | undefined>('time', NumberParam)

  return (
    <Swiper
      key={postData.id}
      onSwiper={onInit}
      initialSlide={slide != null ? slide : 0}
      {...GALLERY_PROPS}
      style={{
        height: '100%'
      }}
    >
      {postData.content.map((content, index) =>
        <SwiperSlide
          key={content.id}
          {...SLIDE_PROPS}
        >
          {({ isActive }) => (
            <CinematicSlide>
              <SupporterSlide
                postContentQuery={content}
                postQuery={postData}
              >
                <CinematicMedia
                  mediaQuery={content.media}
                  isActive={isActive}
                  currentTime={(slide != null && index === slide && time != null) ? time : 0}
                />
              </SupporterSlide>
            </CinematicSlide>
          )}
        </SwiperSlide>)}
    </Swiper>
  )
}
