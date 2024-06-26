import {
  Box,
  Flex,
  Heading,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text
} from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import type { PostContentPreviewFragment$key } from '@//:artifacts/PostContentPreviewFragment.graphql'
import type { PostContentPreviewPostFragment$key } from '@//:artifacts/PostContentPreviewPostFragment.graphql'
import PostContentPreviewMenu from './PostContentPreviewMenu/PostContentPreviewMenu'
import { Trans } from '@lingui/macro'
import RemovePostContentButton from './PostContentPreviewMenu/RemovePostContentButton/RemovePostContentButton'
import Button from '@//:modules/form/Button/Button'
import SupporterPostContentButton from './SupporterPostContentButton/SupporterPostContentButton'
import ExpandableResourceInfo from './ExpandableResourceInfo/ExpandableResourceInfo'
import useRandomColorPalette from '@//:modules/hooks/useRandomColorPalette'

interface Props {
  query: PostContentPreviewFragment$key
  postQuery: PostContentPreviewPostFragment$key
}

const Fragment = graphql`
  fragment PostContentPreviewFragment on PostContent {
    id
    isSupporterOnly
    media {
      __typename
      ...on RawMedia {
        failed
      }
    }
    ...PostContentPreviewMenuFragment
    ...RemovePostContentButtonFragment
    ...SupporterPostContentButtonFragment
    ...ExpandableResourceInfoFragment
  }
`

const PostFragment = graphql`
  fragment PostContentPreviewPostFragment on Post {
    id
    content {
      id
    }
    ...PostContentPreviewMenuPostFragment
    ...RemovePostContentButtonPostFragment
    ...SupporterPostContentButtonPostFragment
  }
`

export default function PostContentPreview ({
  query,
  postQuery
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const postData = useFragment(PostFragment, postQuery)

  const index = postData.content.findIndex(item => item.id === data.id)

  const color = useRandomColorPalette(data.id)

  const getHeight = (): number => {
    if (postData.content.length <= 1) {
      return 150
    } else {
      return 125
    }
  }

  if (data.media.__typename === 'RawMedia' && data.media.failed) {
    return (
      <Flex
        h={getHeight()}
        bg='gray.800'
        borderRadius='md'
        overflow='hidden'
        borderWidth={2}
        borderColor='orange.300'
      >
        <Stack px={4} py={2} w='100%' h='100%' align='flex-end' justify='center' spacing={0}>
          <Box>
            <Heading fontSize='sm' color='orange.300'>
              <Trans>Processing Failed</Trans>
            </Heading>
            <Text fontSize='sm' color='orange.100'>
              <Trans>This content failed to process. Please remove the content and try uploading it again.</Trans>
            </Text>
          </Box>
          <HStack spacing={2}>
            <Box>
              <Popover>
                <PopoverTrigger>
                  <Button
                    size='sm'
                    colorScheme='orange'
                    variant='ghost'
                  >
                    <Trans>
                      Help
                    </Trans>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverBody fontSize='sm'>
                    <Trans>
                      We were not able to process your upload through our system. This could be because the format of
                      the
                      file is invalid or a completely separate issue. Please remove the content and try uploading files
                      that are
                      as close to the source file as possible.
                    </Trans>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            <RemovePostContentButton query={data} postQuery={postData} isButton />
          </HStack>
        </Stack>
      </Flex>
    )
  }

  return (
    <Flex
      h={getHeight()}
      bg='gray.800'
      borderRadius='md'
      overflow='hidden'
      borderWidth={2}
      borderColor={data.isSupporterOnly ? 'green.300' : 'gray.800'}
    >
      <Flex position='relative' align='center' w='12%' justify='center'>
        <Flex
          borderRadius='lg'
          bg={data.isSupporterOnly ? 'green.300' : 'gray.600'}
          w={10}
          h={10}
          align='center'
          justify='center'
        >
          <Heading color={data.isSupporterOnly ? 'green.700' : 'gray.100'} fontSize='xl'>
            {index + 1}
          </Heading>
        </Flex>
      </Flex>
      <Flex p={2} align='center' justify='center' w='38%'>
        <Flex w='100%' h='100%'>
          <ExpandableResourceInfo query={data} />
        </Flex>
      </Flex>
      <Flex align='center' justify='center' w='38%'>
        <SupporterPostContentButton query={data} postQuery={postData} />
      </Flex>
      <Flex position='relative' align='center' bg='gray.700' w='12%' justify='center'>
        {postData.content.length > 9 && (
          <Box position='absolute' w={2} h={2} borderRadius='full' top={2} right={2} bg={color} />
        )}
        <PostContentPreviewMenu query={data} postQuery={postData} />
      </Flex>
    </Flex>
  )
}
