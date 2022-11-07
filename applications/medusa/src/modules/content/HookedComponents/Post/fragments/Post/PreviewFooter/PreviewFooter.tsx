import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { PreviewFooterFragment$key } from '@//:artifacts/PreviewFooterFragment.graphql'
import { Box, Heading, HStack, StackProps } from '@chakra-ui/react'
import PostLikeButton from '../../Interact/PostLike/PostLikeButton/PostLikeButton'
import { Trans } from '@lingui/macro'
import { Icon } from '../../../../../PageLayout'
import { MagicBall } from '@//:assets/icons'
import MenuSimplePublicPost from '../../Interact/MenuSimplePublicPost/MenuSimplePublicPost'

interface Props extends StackProps {
  postQuery: PreviewFooterFragment$key
}

const PostFragment = graphql`
  fragment PreviewFooterFragment on Post {
    ...PostLikeButtonFragment
    ...MenuSimplePublicPostFragment
  }
`
export default function PreviewFooter (props: Props): JSX.Element {
  const {
    postQuery,
    ...rest
  } = props

  const postData = useFragment(PostFragment, postQuery)

  return (
    <HStack spacing={1} justify='space-between' {...rest}>
      <Box pointerEvents='none' w='100%' p={1} overflow='hidden' position='relative' borderRadius='lg' h={10}>
        <HStack spacing={2} h='100%' align='center' justify='flex-start'>
          <Icon fill='whiteAlpha.300' icon={MagicBall} w={5} h={5} />
          <Box>
            <Heading fontSize='sm' color='whiteAlpha.300'>
              <Trans>
                View Full Post
              </Trans>
            </Heading>
            <Heading fontSize='2xs' color='whiteAlpha.200'>
              <Trans>
                HD & CONTROLS
              </Trans>
            </Heading>
          </Box>
        </HStack>
      </Box>
      <HStack spacing={2}>
        <MenuSimplePublicPost postQuery={postData} />
        <PostLikeButton postQuery={postData} />
      </HStack>
    </HStack>
  )
}
