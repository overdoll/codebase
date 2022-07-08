import { Flex, FlexProps } from '@chakra-ui/react'
import type { ResourceIconFragment$key } from '@//:artifacts/ResourceIconFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import RandomIcon from '../RandomIcon/RandomIcon'
import ImageSnippet from '../ImageSnippet/ImageSnippet'
import VideoSnippet from '../VideoSnippet/VideoSnippet'

interface Props extends FlexProps {
  query: ResourceIconFragment$key | null | undefined
  showBorder?: boolean
  seed: string | undefined
}

const Fragment = graphql`
  fragment ResourceIconFragment on Resource {
    ...ImageSnippetFragment
    ...VideoSnippetFragment
    type
    preview
  }
`

const DEFAULT_SIZE = 8

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
      <Flex flexShrink={0} bg='gray.500' w={8} h={8} borderRadius='20%' {...rest}>
        <RandomIcon seed={seed} />
      </Flex>
    )
  }

  const {
    h
  } = rest

  const getBorderSize = (): number => {
    if (h == null) return 3
    if (h >= 12) {
      return 1.7
    }
    if (h >= 8) {
      return 1.5
    }
    if (h >= 4) {
      return 1.3
    }
    return 1.2
  }

  const iconBorder = {
    boxShadow: `inset 0 0 0 ${getBorderSize()}px ${data.preview}70`
  }

  return (
    <Flex
      flexShrink={0}
      align='center'
      justify='center'
      borderRadius='20%'
      overflow='hidden'
      position='relative'
      w={DEFAULT_SIZE}
      h={DEFAULT_SIZE}
      {...rest}
    >
      {showBorder && <Flex zIndex={1} w='100%' h='100%' borderRadius='inherit' {...iconBorder} position='absolute' />}
      {data.type === 'IMAGE' &&
        <ImageSnippet tinyError query={data} />}
      {data.type === 'VIDEO' &&
        <VideoSnippet query={data} />}
    </Flex>
  )
}
