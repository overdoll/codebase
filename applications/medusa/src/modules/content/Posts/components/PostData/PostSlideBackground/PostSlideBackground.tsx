import { graphql, useFragment } from 'react-relay'
import { ReactNode } from 'react'
import { PostSlideBackgroundFragment$key } from '@//:artifacts/PostSlideBackgroundFragment.graphql'
import { Flex } from '@chakra-ui/react'

interface Props {
  query: PostSlideBackgroundFragment$key
  children: ReactNode
}

const Fragment = graphql`
  fragment PostSlideBackgroundFragment on PostContent {
    resource @required(action: THROW) {
      preview
      type
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
