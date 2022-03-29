import { graphql, useFragment } from 'react-relay'
import { Box, Flex, Stack } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import { useContext } from 'react'
import { PostVideoManagerContext } from '../../../support/PostVideoManager/PostVideoManager'
import { PostGalleryPublicSimpleFragment$key } from '@//:artifacts/PostGalleryPublicSimpleFragment.graphql'
import PostMedia from '../../PostMedia/PostMedia'
import LinkButton from '../../../../ThemeComponents/LinkButton/LinkButton'
import { Trans } from '@lingui/macro'
import { ArrowButtonRight } from '@//:assets/icons'
import Icon from '../../../../PageLayout/Flair/Icon/Icon'
import PostSupporterContent from '../PostSupporterContent/PostSupporterContent'

interface Props {
  query: PostGalleryPublicSimpleFragment$key | null
}

const Fragment = graphql`
  fragment PostGalleryPublicSimpleFragment on Post {
    id
    reference
    content {
      resource {
        ...PostMediaFragment
      }
      ...PostSupporterContentFragment
    }
    club {
      ...PostSupporterContentClubFragment
    }
    ...PostClickableCategoriesFragment
    ...PostClickableCharactersFragment
  }
`

export default function PostGalleryPublicSimple ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    onInitialize
  } = useContext(PostVideoManagerContext)

  return (
    <Stack spacing={1}>
      <Box>
        <Swiper
          observer
          onSwiper={(swiper) =>
            onInitialize(swiper)}
          onObserverUpdate={(swiper) => onInitialize(swiper)}
        >
          {data?.content.map((item, index) =>
            <SwiperSlide
              key={index}
            >
              <Flex bg='gray.800' w='100%' h='72vh' align='center' justify='center'>
                <Stack spacing={1}>
                  <PostSupporterContent
                    query={item}
                    clubQuery={data.club}
                  >
                    <PostMedia
                      query={item.resource}
                      index={index}
                      reference={data.reference}
                    />
                  </PostSupporterContent>
                  <Flex px={1} justify='flex-end'>
                    <LinkButton
                      size='sm'
                      variant='ghost'
                      colorScheme='gray'
                      rightIcon={<Icon w={2} h={2} icon={ArrowButtonRight} fill='inherit' />}
                      to={`/p/${data?.reference}`}
                    >
                      <Trans>
                        View Post
                      </Trans>
                    </LinkButton>
                  </Flex>
                </Stack>
              </Flex>
            </SwiperSlide>)}
        </Swiper>
      </Box>
    </Stack>
  )
}
