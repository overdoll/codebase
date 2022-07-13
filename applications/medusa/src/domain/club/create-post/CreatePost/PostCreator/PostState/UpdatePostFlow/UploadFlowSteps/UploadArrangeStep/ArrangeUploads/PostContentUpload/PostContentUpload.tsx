import { Flex, Heading, Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import type { PostContentUploadFragment$key } from '@//:artifacts/PostContentUploadFragment.graphql'
import type { PostContentUploadPostFragment$key } from '@//:artifacts/PostContentUploadPostFragment.graphql'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ResourceInfo from '@//:modules/content/DataDisplay/ResourceInfo/ResourceInfo'
import { Icon } from '@//:modules/content/PageLayout'
import { ArrowButtonDown, ArrowButtonUp } from '@//:assets/icons'
import IconButton from '@//:modules/form/IconButton/IconButton'
import SupporterPostContentUploadButton from './SupporterPostContentUploadButton/SupporterPostContentUploadButton'
import RemovePostContentUploadButton from './RemovePostContentUploadButton/RemovePostContentUploadButton'

type OnDragEndFunction = (result) => void

interface Props {
  query: PostContentUploadFragment$key
  postQuery: PostContentUploadPostFragment$key
  index: number
  onDragEnd: OnDragEndFunction
}

const PostFragment = graphql`
  fragment PostContentUploadPostFragment on Post {
    id
    content {
      id
    }
    ...SupporterPostContentUploadButtonPostFragment
    ...RemovePostContentUploadButtonPostFragment
  }
`

const Fragment = graphql`
  fragment PostContentUploadFragment on PostContent {
    id
    isSupporterOnly
    ...ResourceInfoFragment
    resource {
      id
    }
    ...SupporterPostContentUploadButtonFragment
    ...RemovePostContentUploadButtonFragment
  }
`

export default function PostContentUpload ({
  index,
  query,
  onDragEnd,
  postQuery
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)
  const postData = useFragment(PostFragment, postQuery)

  const totalContent = postData.content.length

  const { i18n } = useLingui()

  const getHeight = (): number => {
    if (postData.content.length <= 1) {
      return 150
    } else if (postData.content.length < 6) {
      return 100
    } else {
      return 75
    }
  }

  const ArrangeButtons = (): JSX.Element => {
    const ARRANGE_BUTTON = {
      borderRadius: 'xl',
      size: 'sm',
      variant: 'ghost'
    }

    const onUp = (): void => {
      onDragEnd({
        source: {
          index: index
        },
        destination: {
          index: index - 1
        }
      })
    }

    const onDown = (): void => {
      onDragEnd({
        source: {
          index: index
        },
        destination: {
          index: index + 1
        }
      })
    }

    return (
      <Stack spacing={2} justify='space-between' align='center'>
        {index !== 0 && (
          <IconButton
            aria-label={i18n._(t`Up`)}
            icon={(
              <Icon
                p={2}
                icon={ArrowButtonUp}
                fill='gray.100'
                h='100%'
                w='100%'
              />)}
            onClick={onUp}
            {...ARRANGE_BUTTON}
          />
        )}
        {index + 1 < totalContent && (
          <IconButton
            aria-label={i18n._(t`Down`)}
            icon={(
              <Icon
                p={2}
                icon={ArrowButtonDown}
                fill='gray.100'
                h='100%'
                w='100%'
              />)}
            onClick={onDown}
            {...ARRANGE_BUTTON}
          />
        )}
      </Stack>
    )
  }

  return (
    <Flex
      h={getHeight()}
      bg='gray.800'
      borderRadius='md'
      overflow='hidden'
    >
      <Flex align='center' w='12%' justify='center'>
        <Flex borderRadius='full' bg='gray.600' w={10} h={10} align='center' justify='center'>
          <Heading fontSize='xl'>
            {index + 1}
          </Heading>
        </Flex>
      </Flex>
      <Flex p={2} align='center' justify='center' w='38%'>
        <Flex overflow='hidden' w='100%' h='100%' borderRadius='md'>
          <ResourceInfo containCover query={data} />
        </Flex>
      </Flex>
      <Flex align='center' justify='center' w='38%'>
        <SupporterPostContentUploadButton query={data} postQuery={postData} />
      </Flex>
      <Flex align='center' bg='gray.700' w='12%' justify='center'>
        <RemovePostContentUploadButton query={data} postQuery={postData} />
      </Flex>
    </Flex>
  )
}
