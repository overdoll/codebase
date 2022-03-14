import { Box, HStack } from '@chakra-ui/react'
import { graphql } from 'react-relay'
import { PostIndexerFragment$key } from '@//:artifacts/PostIndexerFragment.graphql'
import { useFragment } from 'react-relay/hooks'

interface Props {
  query: PostIndexerFragment$key
  length: number
  currentIndex: number
  slidesPerView?: number
  hideWhenEmpty?: boolean
}

const Fragment = graphql`
  fragment PostIndexerFragment on Post {
    content {
      isSupporterOnly
      resource {
        type
      }
    }
  }
`

export default function PostIndexer ({
  length,
  currentIndex,
  slidesPerView = 1,
  hideWhenEmpty = true,
  query,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const calculateIndex = (length: number): number => {
    return length - (slidesPerView - 1) < 0 ? 1 : length - (slidesPerView - 1)
  }
  const checkSupporter = (index: number): boolean => {
    return data.content[index]?.isSupporterOnly
  }

  if (length <= 1 && hideWhenEmpty) {
    return <></>
  }

  return (
    <HStack
      py={2}
      spacing={1}
      align='center'
      justify='center'
      {...rest}
    >
      {[...Array(calculateIndex(length)).keys()].map((key) => {
        const isActive = key === currentIndex
        const isSupporterOnly = checkSupporter(key)

        return (
          <Box
            w={isActive ? 2 : 1}
            h={isActive ? 2 : 1}
            bg={isSupporterOnly ? 'orange.400' : 'gray.300'}
            borderRadius='base'
            key={key}
          />
        )
      })}
    </HStack>
  )
}
