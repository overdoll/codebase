import { Flex, Text } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ResourceInfoFragment$key } from '@//:artifacts/ResourceInfoFragment.graphql'
import ResourceItem, { ResourceItemBorderProp } from '../ResourceItem/ResourceItem'
import { Icon } from '../../PageLayout'
import { ControlPlayButton, PictureIdentifier } from '@//:assets/icons'
import { ImageSnippetCoverProps } from '../ImageSnippet/ImageSnippet'

interface Props extends ImageSnippetCoverProps, ResourceItemBorderProp {
  query: ResourceInfoFragment$key
  cover?: boolean
}

const Fragment = graphql`
  fragment ResourceInfoFragment on PostContent {
    id
    isSupporterOnly
    resource {
      type
      processed
      videoDuration
      ...ResourceItemFragment
    }
    supporterOnlyResource {
      type
      videoDuration
    }
  }
`

export default function ResourceInfo ({
  query,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data?.resource == null || !data?.resource?.processed) {
    return (
      <ResourceItem seed={data?.id} h='100%' query={data?.resource} {...rest} />
    )
  }

  const resourceType = (data.isSupporterOnly && data.supporterOnlyResource != null) ? data.supporterOnlyResource.type : data.resource.type

  return (
    <Flex w='100%' h='100%' position='relative'>
      <ResourceItem showBorder seed={data.id} query={data.resource} {...rest} />
      <Flex w='100%' h='100%' align='center' justify='center' position='absolute'>
        <Flex align='center' justify='center' p={2} borderRadius='lg' bg='dimmers.400'>
          <Icon
            fill='gray.00'
            icon={resourceType === 'VIDEO' ? ControlPlayButton : PictureIdentifier}
            w={4}
            h={4}
            flexShrink={0}
          />
          {resourceType === 'VIDEO' && (
            <Text ml={2} noOfLines={1} color='gray.00' fontSize='xs'>
              {((data?.supporterOnlyResource?.videoDuration ?? data.resource.videoDuration) / 1000).toFixed(0)}s
            </Text>)}
        </Flex>
      </Flex>
    </Flex>
  )
}
