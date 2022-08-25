import { graphql, useFragment } from 'react-relay'
import { ReactNode } from 'react'
import { PostSlideBackgroundFragment$key } from '@//:artifacts/PostSlideBackgroundFragment.graphql'
import { Flex, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

interface Props {
  query: PostSlideBackgroundFragment$key
  children: ReactNode
}

const Fragment = graphql`
  fragment PostSlideBackgroundFragment on PostContent {
    resource @required(action: THROW) {
      preview
      type
      processed
      videoThumbnail {
        url
      }
    }
  }
`

export default function PostSlideBackground ({
  query,
  children
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (!data.resource.processed) {
    return (
      <Flex
        bg='gray.800'
        h='400px'
        w='100%'
        align='center'
        justify='center'
        overflow='hidden'
      >
        <Text textAlign='center'>
          <Trans>
            Preview is only available once content is processed. You may submit your post at this stage, and we will
            notify you if there are any issues.
          </Trans>
        </Text>
      </Flex>
    )
  }

  return (
    <Flex
      bg={data.resource.preview != null && data.resource.preview !== '' ? data.resource.preview : 'gray.800'}
      h='100%'
      w='100%'
      align='center'
      justify='center'
      position='relative'
      overflow='hidden'
    >
      {data.resource.type === 'VIDEO' && (
        <Flex
          left='50%'
          w='10%'
          h='10%'
          transform='scale(11)'
          top='50%'
          bg='center center / cover no-repeat'
          backgroundImage={data.resource?.videoThumbnail?.url ?? ''}
          filter='blur(2px)'
          opacity={0.5}
          position='absolute'
          cursor='pointer'
        />
      )}
      {children}
    </Flex>
  )
}
