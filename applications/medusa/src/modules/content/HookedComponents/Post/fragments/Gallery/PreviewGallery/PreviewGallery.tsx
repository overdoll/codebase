import { PreviewGalleryFragment$key } from '@//:artifacts/PreviewGalleryFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { Swiper, SwiperSlide } from 'swiper/react'
import { GALLERY_PROPS, SLIDE_PROPS } from '../../../constants'
import { OnSwiperInitType } from '../../../types'
import { PreviewMedia } from '../../../../Media'
import SupporterSlide from '../SupporterSlide/SupporterSlide'
import PreviewSlide from '../../../components/PreviewSlide/PreviewSlide'
import { OnPlayerInitType } from '../../../../Media/types'
import { PREVIEW_LIMIT } from '../../Content/PreviewContent/PreviewContent'
import { Center, Flex, Heading, HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import LinkButton from '../../../../../ThemeComponents/LinkButton/LinkButton'
import ThumbnailCarouseItem from '../../Carousel/ThumbnailCarouselItem/ThumbnailCarouseItem'

interface Props {
  postQuery: PreviewGalleryFragment$key
  onSwiper?: OnSwiperInitType
  onPlayerInit?: OnPlayerInitType
}

const PostFragment = graphql`
  fragment PreviewGalleryFragment on Post {
    id
    reference
    club {
      slug
    }
    content {
      id
      media {
        ...PreviewMediaFragment
        ...ThumbnailCarouseItemFragment
      }
      ...SupporterSlideFragment
    }
    ...SupporterSlidePostFragment
  }
`

export default function PreviewGallery (props: Props): JSX.Element {
  const {
    postQuery,
    onSwiper,
    onPlayerInit
  } = props

  const postData = useFragment(PostFragment, postQuery)

  const slicedData = postData.content.slice(0, PREVIEW_LIMIT)

  const hasMoreData = postData.content.length > PREVIEW_LIMIT

  return (
    <Swiper
      key={postData.id}
      onSwiper={onSwiper}
      {...GALLERY_PROPS}
    >
      {slicedData.map((content) =>
        <SwiperSlide
          key={content.id}
          {...SLIDE_PROPS}
        >
          {({ isActive }) => (
            <PreviewSlide>
              <SupporterSlide
                isActive={isActive}
                postContentQuery={content}
                postQuery={postData}
              >
                <PreviewMedia
                  mediaQuery={content.media}
                  observerProps={{
                    isActive
                  }}
                  videoProps={{
                    onPlayerInit
                  }}
                />
              </SupporterSlide>
            </PreviewSlide>
          )}
        </SwiperSlide>)}
      {hasMoreData && (
        <SwiperSlide
          {...SLIDE_PROPS}
        >
          <Stack px={2} spacing={4} borderRadius='lg' bg='gray.800' w='100%' h='100%' align='center' justify='center'>
            <Heading textAlign='center' fontSize='2xl' color='gray.00'>
              <Trans>
                See the rest of the post
              </Trans>
            </Heading>
            <HStack w='100%' maxH='100px' spacing={1}>
              {postData.content.slice(PREVIEW_LIMIT, PREVIEW_LIMIT + 3).map((item) => (
                <Flex
                  key={item.id}
                  position='relative'
                  borderRadius='2px'
                  w='100%'
                  h='100%'
                >
                  <ThumbnailCarouseItem mediaQuery={item.media} isSupporter={false} />
                </Flex>
              ))}
              <Center bg='gray.700' w='100%' h='100%'>
                <Heading color='gray.100' fontSize='sm' textAlign='center'>
                  +{postData.content.length - PREVIEW_LIMIT}
                </Heading>
              </Center>
            </HStack>
            <LinkButton
              size='lg'
              colorScheme='white'
              href={{
                pathname: '/[slug]/post/[reference]',
                query: {
                  slug: postData.club.slug,
                  reference: postData.reference
                }
              }}
            >
              <Trans>
                See full post
              </Trans>
            </LinkButton>
          </Stack>
        </SwiperSlide>
      )}
    </Swiper>
  )
}
