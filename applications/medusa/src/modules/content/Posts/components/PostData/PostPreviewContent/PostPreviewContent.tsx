import { graphql, useFragment } from 'react-relay'
import type { PostPreviewContentFragment$key } from '@//:artifacts/PostPreviewContentFragment.graphql'
import { Flex, HStack, Text } from '@chakra-ui/react'
import { FileMultiple, PremiumStar } from '@//:assets/icons'
import Icon from '../../../../PageLayout/Flair/Icon/Icon'
import ResourceInfo from '../../../../DataDisplay/ResourceInfo/ResourceInfo'

interface Props {
  query: PostPreviewContentFragment$key
}

const Fragment = graphql`
  fragment PostPreviewContentFragment on Post {
    content {
      isSupporterOnly
      ...ResourceInfoFragment
    }
  }
`

export default function PostPreviewContent ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const firstContent = data.content[0]

  const hasMoreThanOne = data.content.length > 1

  const supporterOnlyCount = data.content.filter((item) => item.isSupporterOnly).length
  const freeContentCount = data.content.filter((item) => !item.isSupporterOnly).length

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
      <ResourceInfo showBorder query={firstContent} />
      {hasMoreThanOne &&
        <HStack
          align='center'
          borderRadius='xl'
          bg='dimmers.400'
          spacing={2}
          m={2}
          position='absolute'
          py={1}
          px={2}
          right={0}
          bottom={0}
        >
          {freeContentCount > 0 && (
            <Flex align='center'>
              <Icon icon={FileMultiple} w={3} h={3} mr={1} fill='gray.00' />
              <Text fontWeight='semibold' color='gray.00'>
                {freeContentCount}
              </Text>
            </Flex>)}
          {supporterOnlyCount > 0 && (
            <Flex align='center'>
              <Icon icon={PremiumStar} w={3} h={3} mr={1} fill='gray.00' />
              <Text fontWeight='semibold' color='gray.00'>
                {supporterOnlyCount}
              </Text>
            </Flex>)}
        </HStack>}
    </Flex>
  )
}
