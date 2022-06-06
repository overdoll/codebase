import { Box, Flex, HTMLChakraProps, Stack, Text } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ResourceInfoFragment$key } from '@//:artifacts/ResourceInfoFragment.graphql'
import ResourceItem from '../ResourceItem/ResourceItem'
import { Icon } from '../../PageLayout'
import { ControlPlayButton, PictureIdentifier, PremiumStar } from '@//:assets/icons'

interface Props extends HTMLChakraProps<any> {
  query: ResourceInfoFragment$key
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
  }
`

export default function ResourceInfo ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data?.resource == null || !data?.resource?.processed) {
    return (
      <ResourceItem seed={data?.id} h='100%' query={data?.resource} />
    )
  }

  return (
    <Flex w='100%' h='100%' position='relative'>
      <ResourceItem seed={data.id} query={data.resource} />
      <Flex w='100%' h='100%' align='center' justify='center' position='absolute'>
        <Stack align='center' spacing={1}>
          <Box p={2} borderRadius='full' bg='dimmers.400' w={8} h={8}>
            <Icon
              fill='gray.00'
              icon={data.isSupporterOnly ? PremiumStar : (data.resource.type === 'VIDEO' ? ControlPlayButton : PictureIdentifier)}
              w='100%'
              h='100%'
            />
          </Box>
          {data.resource.type === 'VIDEO' && (
            <Box py={0} px={1} borderRadius='sm' bg='dimmers.400'>
              <Text color='gray.00' fontSize='xs'>
                {(data.resource.videoDuration / 1000).toFixed(0)}s
              </Text>
            </Box>)}
        </Stack>
      </Flex>
    </Flex>
  )
}
