import { Box, Flex, HTMLChakraProps } from '@chakra-ui/react'
import type { ResourceItemFragment$key } from '@//:artifacts/ResourceItemFragment.graphql'
import type { ResourceIconFragment$key } from '@//:artifacts/ResourceIconFragment.graphql'

import ResourceItem from '../ResourceItem/ResourceItem'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'

interface Props extends HTMLChakraProps<any> {
  query: ResourceIconFragment$key
}

const Fragment = graphql`
  fragment ResourceIconFragment on Resource {
    ...ResourceItemFragment
  }
`

export default function ResourceIcon ({
  query,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data == null) return <Box bg='gray.500' w={8} h={8} borderRadius='25%' {...rest} />

  return (
    <Flex align='center' justify='center' borderRadius='25%' overflow='hidden' w={8} h={8} {...rest}>
      <ResourceItem query={data as ResourceItemFragment$key} />
    </Flex>
  )
}
