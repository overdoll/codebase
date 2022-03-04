import { Flex, Skeleton } from '@chakra-ui/react'

export default function SkeletonDropdownMenuButton (): JSX.Element {
  return (
    <Flex p={2}>
      <Skeleton
        m={1}
        w={{
          base: 24,
          md: '100%'
        }}
        h={{
          base: 24,
          md: 10
        }}
      />
    </Flex>
  )
}
