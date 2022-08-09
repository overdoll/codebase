import { Flex, FlexProps, Progress } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import ImageSnippet, { ImageSnippetCoverProps } from '../ImageSnippet/ImageSnippet'
import VideoSnippet from '../VideoSnippet/VideoSnippet'
import { useFragment } from 'react-relay'
import type { ResourceItemFragment$key } from '@//:artifacts/ResourceItemFragment.graphql'
import RandomPattern from '../RandomPattern/RandomPattern'
import { Icon } from '../../PageLayout'
import { TimeHourGlass, WarningTriangle } from '@//:assets/icons'

export interface ResourceItemBorderProp {
  showBorder?: boolean
}

interface Props extends FlexProps, ImageSnippetCoverProps, ResourceItemBorderProp {
  query: ResourceItemFragment$key | null
  seed: string | undefined
}

const Fragment = graphql`
  fragment ResourceItemFragment on Resource {
    type
    processed
    preview
    failed
    progress {
      progress
      state
    }
    ...ImageSnippetFragment
    ...VideoSnippetFragment
  }
`

export default function ResourceItem ({
  query,
  seed,
  cover,
  containCover,
  showBorder = false,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data == null) {
    return (
      <Flex h='100%' w='100%' justify='center' align='center' {...rest}>
        <RandomPattern seed={seed} />
      </Flex>
    )
  }

  if (data.failed) {
    return (
      <Flex w='100%' p={4} align='center' justify='center' h='100%' {...rest}>
        <Icon icon={WarningTriangle} fill='gray.500' w={6} h={6} />
      </Flex>
    )
  }

  if (data?.progress != null) {
    const DisplayProgress = (): JSX.Element => {
      if (data.progress == null) return <></>

      switch (data.progress.state) {
        case 'WAITING':
          return (
            <Progress
              size='md'
              colorScheme='gray'
              w='100%'
              hasStripe
              isAnimated
              value={100}
            />
          )
        case 'STARTED':
          return (
            <Progress
              size='md'
              colorScheme='teal'
              w='100%'
              value={data.progress.progress}
            />
          )
        case 'FINALIZING':
          return (
            <Progress
              size='md'
              colorScheme='teal'
              w='100%'
              hasStripe
              isAnimated
              value={100}
            />
          )
        default:
          return <></>
      }
    }

    return (
      <Flex w='100%' p={2} align='center' justify='center' h='100%' {...rest}>
        <DisplayProgress />
      </Flex>
    )
  }

  if (!data.processed) {
    return (
      <Flex w='100%' p={4} align='center' justify='center' h='100%' {...rest}>
        <Icon icon={TimeHourGlass} fill='gray.500' w={6} h={6} />
      </Flex>
    )
  }
  const iconBorder = {
    boxShadow: `inset 0 0 0 3px ${data.preview}70`
  }

  const DisplayMedia = (): JSX.Element => {
    switch (data.type) {
      case 'IMAGE':
        return <ImageSnippet containCover={containCover} cover={cover ?? true} query={data} />
      case 'VIDEO':
        return (
          <VideoSnippet query={data} />
        )
      default:
        return <></>
    }
  }

  return (
    <Flex
      w='100%'
      h='100%'
      borderRadius='md'
      position='relative'
      {...rest}
    >
      {showBorder && <Flex w='100%' h='100%' borderRadius='inherit' {...iconBorder} position='absolute' />}
      <DisplayMedia />
    </Flex>

  )
}
