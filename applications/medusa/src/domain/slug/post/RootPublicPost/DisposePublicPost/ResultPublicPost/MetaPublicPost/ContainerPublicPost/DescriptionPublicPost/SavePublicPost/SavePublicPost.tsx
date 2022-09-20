import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { SavePublicPostFragment$key } from '@//:artifacts/SavePublicPostFragment.graphql'
import { Box, Heading, HStack, StackProps } from '@chakra-ui/react'
import PostLikeButton
  from '@//:modules/content/HookedComponents/Post/fragments/Interact/PostLike/PostLikeButton/PostLikeButton'
import { Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { MagicBall } from '@//:assets/icons'

interface Props extends StackProps {
  postQuery: SavePublicPostFragment$key
}

const PostFragment = graphql`
  fragment SavePublicPostFragment on Post {
    ...PostLikeButtonFragment
  }
`
export default function SavePublicPost (props: Props): JSX.Element {
  const {
    postQuery,
    ...rest
  } = props

  const postData = useFragment(PostFragment, postQuery)

  return (
    <HStack spacing={1} justify='space-between' {...rest}>
      <Box pointerEvents='none' w='100%' p={1} overflow='hidden' position='relative' borderRadius='lg' h={10}>
        <HStack
          spacing={{
            base: 2,
            md: 3
          }}
          h='100%'
          align='center'
          justify='flex-start'
        >
          <Icon
            fill='whiteAlpha.300'
            icon={MagicBall}
            w={{
              base: 5,
              md: 7
            }}
            h={{
              base: 5,
              md: 7
            }}
          />
          <Box>
            <Heading
              fontSize={{
                base: 'sm',
                md: 'md'
              }}
              color='whiteAlpha.300'
            >
              <Trans>
                Save this post
              </Trans>
            </Heading>
            <Heading
              fontSize={{
                base: '2xs',
                md: 'xs'
              }}
              color='whiteAlpha.200'
            >
              <Trans>
                Let the artist know you love their content
              </Trans>
            </Heading>
          </Box>
        </HStack>
      </Box>
      <PostLikeButton postQuery={postData} />
    </HStack>
  )
}
