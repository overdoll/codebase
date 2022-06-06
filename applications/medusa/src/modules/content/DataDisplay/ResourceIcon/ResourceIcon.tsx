import { Flex, HTMLChakraProps } from '@chakra-ui/react'
import type { ResourceIconFragment$key } from '@//:artifacts/ResourceIconFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import RandomIcon from '../RandomIcon/RandomIcon'
import ImageSnippet from '../ImageSnippet/ImageSnippet'
import VideoSnippet from '../VideoSnippet/VideoSnippet'

interface Props extends HTMLChakraProps<any> {
  query: ResourceIconFragment$key | null | undefined
  showBorder?: boolean
  seed: string | undefined
}

const Fragment = graphql`
  fragment ResourceIconFragment on Resource {
    ...ImageSnippetFragment
    ...VideoSnippetFragment
    type
  }
`

export default function ResourceIcon ({
  query,
  showBorder = false,
  seed,
  ...rest
}: Props): JSX.Element {
  if (query === undefined) return <></>

  const data = useFragment(Fragment, query)

  if (data == null) {
    return (
      <Flex flexShrink={0} bg='gray.500' w={8} h={8} borderRadius='25%' {...rest}>
        <RandomIcon seed={seed} />
      </Flex>
    )
  }

  return (
    <Flex flexShrink={0} align='center' justify='center' borderRadius='25%' overflow='hidden' w={8} h={8} {...rest}>
      {data.type === 'IMAGE' &&
        <ImageSnippet cover query={data} />}
      {data.type === 'VIDEO' &&
        <VideoSnippet query={data} />}
    </Flex>
  )
}
