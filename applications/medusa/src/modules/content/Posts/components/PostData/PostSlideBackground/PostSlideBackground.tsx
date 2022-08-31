import { graphql, useFragment } from 'react-relay'
import { ReactNode } from 'react'
import { PostSlideBackgroundFragment$key } from '@//:artifacts/PostSlideBackgroundFragment.graphql'
import { Flex } from '@chakra-ui/react'
import VideoBackground from '../../../../DataDisplay/VideoBackground/VideoBackground'

interface Props {
  query: PostSlideBackgroundFragment$key
  children: ReactNode
}

const Fragment = graphql`
  fragment PostSlideBackgroundFragment on PostContent {
    resource @required(action: THROW) {
      preview
      type
      ...VideoBackgroundFragment
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
        <VideoBackground query={data.resource} />
      )}
      {children}
    </Flex>
  )
}
