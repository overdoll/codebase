import { graphql, useFragment } from 'react-relay'
import type { PostDescriptionFragment$key } from '@//:artifacts/PostDescriptionFragment.graphql'
import { Box, Heading, TextProps } from '@chakra-ui/react'
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

  const fontSize = data.description.length > 120 ? 'sm' : 'md'

  return (
    <Box position='relative'>
      <Heading position='relative' color='gray.200' fontSize={fontSize} {...rest}>
        <Box display='inline-block' transform='translateY(2px)'>
          <Icon icon={BottomRightCurve} w={4} h={4} fill='gray.500' />
        </Box>
        {data.description}
      </Heading>
    </Box>
  )
}
