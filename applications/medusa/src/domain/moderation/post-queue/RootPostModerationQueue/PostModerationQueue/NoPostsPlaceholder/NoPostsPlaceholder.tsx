import { Box, Flex, Heading, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type { NoPostsPlaceholderFragment$key } from '@//:artifacts/NoPostsPlaceholderFragment.graphql'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { ArrowButtonRefresh, CheckCircle, PauseCircle } from '@//:assets/icons'
import { t, Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { LoadQueryType } from '@//:types/hooks'
import { PostModerationQueueQuery$variables } from '@//:artifacts/PostModerationQueueQuery.graphql'
import { useEffect, useRef, useState } from 'react'
import Switch from '@//:modules/form/Switch/Switch'
import { useLingui } from '@lingui/react'

interface Props {
  query: NoPostsPlaceholderFragment$key
  loadQuery: LoadQueryType<PostModerationQueueQuery$variables>
}

const NoPostsPlaceholderFragmentGQL = graphql`
  fragment NoPostsPlaceholderFragment on Account {
    moderatorSettings {
      isInModeratorQueue
    }
  }
`

const REFRESH_TIME = 900000

export default function NoPostsPlaceholder ({
  query,
  loadQuery
}: Props): JSX.Element {
  const data = useFragment(NoPostsPlaceholderFragmentGQL, query)

  const { i18n } = useLingui()

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const loadQueryRefresh = (): void => {
    loadQuery({}, { fetchPolicy: 'network-only' })
  }

  const [allowRefresh, setAllowRefresh] = useState(true)

  useEffect(() => {
    if (!allowRefresh) {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      return
    }

    const refreshLoop = (): void => {
      loadQueryRefresh()
      timeoutRef.current = setTimeout(refreshLoop, REFRESH_TIME)
    }

    timeoutRef.current = setTimeout(refreshLoop, REFRESH_TIME)

    return () => {
      if (timeoutRef.current != null) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [allowRefresh])

  if (!data.moderatorSettings.isInModeratorQueue) {
    return (
      <Stack align='center'>
        <Icon
          w={12}
          h={12}
          mb={4}
          icon={PauseCircle}
          fill='orange.300'
        />
        <Heading color='gray.00' fontSize='4xl'>
          <Trans>
            Moderation Paused
          </Trans>
        </Heading>
        <Text color='gray.200'>
          <Trans>
            Since you've paused your moderator status, you won't get anymore new cases.
          </Trans>
        </Text>
        <LinkButton
          href='/settings/moderation'
          colorScheme='gray'
          variant='ghost'
          size='md'
        >
          <Trans>
            Moderation Settings
          </Trans>
        </LinkButton>
      </Stack>
    )
  }

  return (
    <Stack w='100%' h='100%' position='relative' spacing={4} justify='center' align='center'>
      <Flex w='100%' justify='flex-end' top={0} position='absolute'>
        <IconButton
          icon={<Icon icon={ArrowButtonRefresh} fill='gray.100' w={4} h={4} />}
          aria-label={i18n._(t`Refresh Queue`)}
          size='md'
          colorScheme='gray'
          onClick={loadQueryRefresh}
        />
      </Flex>
      <Icon
        w={12}
        h={12}
        icon={CheckCircle}
        fill='green.300'
      />
      <Box>
        <Heading color='gray.00' fontSize='4xl'>
          <Trans>
            All Clear
          </Trans>
        </Heading>
        <Text color='gray.200'>
          <Trans>
            There are no posts in your queue
          </Trans>
        </Text>
      </Box>
      <HStack align='center' justify='center' spacing={2}>
        <Switch
          colorScheme='green'
          size='md'
          defaultChecked={allowRefresh}
          onChange={(e) => setAllowRefresh(e.target.checked)}
        />
        <Heading fontSize='md' color='gray.100'>
          Refresh every 15 minutes
        </Heading>
      </HStack>
    </Stack>
  )
}
