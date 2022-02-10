import { Flex, HTMLChakraProps } from '@chakra-ui/react'
import type { ResourceIconFragment$key } from '@//:artifacts/ResourceIconFragment.graphql'

import ResourceItem from '../ResourceItem/ResourceItem'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import RandomIcon from '../RandomIcon/RandomIcon'

interface Props extends HTMLChakraProps<any> {
  query: ResourceIconFragment$key | null | undefined
  showBorder?: boolean
}

const Fragment = graphql`
  fragment ResourceIconFragment on Resource {
    ...ResourceItemFragment
  }
`

export default function ResourceIcon ({
  query,
  showBorder = false,
  ...rest
}: Props): JSX.Element {
  if (query === undefined) return <></>

  const data = useFragment(Fragment, query)

  if (data == null) {
    return (
      <Flex flexShrink={0} bg='gray.500' w={8} h={8} borderRadius='25%' {...rest}>
        <RandomIcon />
      </Flex>
    )
  }

  return (
    <Flex flexShrink={0} align='center' justify='center' borderRadius='25%' overflow='hidden' w={8} h={8} {...rest}>
      <ResourceItem h='100%' query={data} />
    </Flex>
  )
}
