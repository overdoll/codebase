import { graphql, useFragment } from 'react-relay'
import type { PostPreviewContentFragment$key } from '@//:artifacts/PostPreviewContentFragment.graphql'
import { Flex, Heading, Text } from '@chakra-ui/react'
import ImageSnippet from '@//:modules/content/DataDisplay/Snippets/ImageSnippet/ImageSnippet'
import VideoSnippet from '@//:modules/content/DataDisplay/Snippets/VideoSnippet/VideoSnippet'
import { FileMultiple } from '@//:assets/icons/navigation'
import Icon from '../../../../modules/content/Icon/Icon'
import { WarningTriangle } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'

interface Props {
  query: PostPreviewContentFragment$key
}

const Fragment = graphql`
  fragment PostPreviewContentFragment on Post {
    content {
      type
      ...ImageSnippetFragment
      ...VideoSnippetFragment
    }
  }
`

export default function PostPreviewContent ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const hasFirstContent = data.content.length > 0

  const firstContent = data.content[0]

  const hasMoreThanOne = data.content.length > 1

  return (
    <Flex position='relative' overflow='hidden' borderRadius='md' w='100%' h='100%' justify='center' align='center'>
      {hasFirstContent
        ? <Flex position='relative' h='100%'>
          {firstContent.type === 'IMAGE' &&
            <ImageSnippet h='100%' query={firstContent} />}
          {firstContent.type === 'VIDEO' &&
            <VideoSnippet
              h='100%'
              query={firstContent}
            />}
        </Flex>
        : <Flex direction='column' align='center'>
          <Icon icon={WarningTriangle} w={8} h={8} mb={3} fill='gray.100' />
          <Heading fontSize='md' color='gray.100'>
            <Trans>
              No Content
            </Trans>
          </Heading>
        </Flex>}
      {hasMoreThanOne &&
        <Flex
          align='center'
          borderRadius='xl'
          bg='dimmers.500'
          m={2}
          position='absolute'
          py={1}
          px={2}
          right={0}
          bottom={0}
        >
          <Icon icon={FileMultiple} w={3} h={3} mr={1} fill='gray.00' />
          <Text fontWeight='semibold' color='gray.00'>
            {data.content.length}
          </Text>
        </Flex>}

    </Flex>

  )
}
