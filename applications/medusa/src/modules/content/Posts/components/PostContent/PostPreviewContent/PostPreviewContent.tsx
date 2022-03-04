import { graphql, useFragment } from 'react-relay'
import type { PostPreviewContentFragment$key } from '@//:artifacts/PostPreviewContentFragment.graphql'
import { Flex, Text } from '@chakra-ui/react'
import { FileMultiple } from '@//:assets/icons/navigation'
import Icon from '../../../../PageLayout/Flair/Icon/Icon'
import ResourceInfo from '../../../../DataDisplay/ResourceInfo/ResourceInfo'

interface Props {
  query: PostPreviewContentFragment$key
}

const Fragment = graphql`
  fragment PostPreviewContentFragment on Post {
    content {
      resource {
        ...ResourceInfoFragment
      }
    }
  }
`

export default function PostPreviewContent ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const firstContent = data.content[0].resource

  const hasMoreThanOne = data.content.length > 1

  return (
    <Flex
      bg='gray.800'
      position='relative'
      overflow='hidden'
      borderRadius='md'
      w='100%'
      h='100%'
      justify='center'
      align='center'
    >
      <ResourceInfo query={firstContent} />
      {hasMoreThanOne &&
        <Flex
          align='center'
          borderRadius='xl'
          bg='dimmers.400'
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
