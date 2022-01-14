import { Flex, Heading, HTMLChakraProps } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import ImageSnippet from '../Snippets/ImageSnippet/ImageSnippet'
import VideoSnippet from '../Snippets/VideoSnippet/VideoSnippet'
import { useFragment } from 'react-relay'
import type { ResourceItemFragment$key } from '@//:artifacts/ResourceItemFragment.graphql'
import Icon from '../../PageLayout/Flair/Icon/Icon'
import { WarningTriangle } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'

interface Props extends HTMLChakraProps<any> {
  query: ResourceItemFragment$key
}

const Fragment = graphql`
  fragment ResourceItemFragment on Resource {
    type
    ...ImageSnippetFragment
    ...VideoSnippetFragment
  }
`

export default function ResourceItem ({
  query,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data == null) {
    return (
      <Flex h='100%' bg='gray.800' direction='column' justify='center' align='center' {...rest}>
        <Icon icon={WarningTriangle} w={6} h={6} mb={3} fill='gray.100' />
        <Heading fontSize='md' color='gray.100'>
          <Trans>
            No Resource
          </Trans>
        </Heading>
      </Flex>
    )
  }

  return (
    <Flex align='center' justify='center' h='100%'>
      {data.type === 'IMAGE' &&
        <ImageSnippet {...rest} query={data} />}
      {data.type === 'VIDEO' &&
        <VideoSnippet {...rest} query={data} />}
    </Flex>
  )
}
