import { graphql, useFragment } from 'react-relay'
import type { PostDescriptionFragment$key } from '@//:artifacts/PostDescriptionFragment.graphql'
import { Box, Text, TextProps } from '@chakra-ui/react'
import { Icon } from '../../../../PageLayout'
import { BottomRightCurve } from '@//:assets/icons'

interface Props extends TextProps {
  query: PostDescriptionFragment$key
}

const Fragment = graphql`
  fragment PostDescriptionFragment on Post {
    description
  }
`

export default function PostDescription ({
  query,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data.description.length === 0) {
    return <></>
  }

  return (
    <Box position='relative'>
      <Text position='relative' color='gray.200' fontSize='sm' {...rest}>
        <Box display='inline-block' transform='translateY(2px)'>
          <Icon icon={BottomRightCurve} w={4} h={4} fill='gray.500' />
        </Box>
        {data.description}
      </Text>
    </Box>
  )
}
