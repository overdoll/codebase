import { Skeleton } from '@chakra-ui/react'

export default function SkeletonDropdownMenuButton (): JSX.Element {
  return (
    <Skeleton
      p={2}
      w={{
        base: 24,
        md: '100%'
      }}
      h={{
        base: 24,
        md: '50px'
      }}
      borderRadius='sm'
    />
  )
}
