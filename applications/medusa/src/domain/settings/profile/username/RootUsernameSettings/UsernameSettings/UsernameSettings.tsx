import { Flex, Stack, Text } from '@chakra-ui/react'
import { graphql, PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay/hooks'
import type { UsernameSettingsFragment$key } from '@//:artifacts/UsernameSettingsFragment.graphql'
import ChangeUsernameForm from './ChangeUsernameForm/ChangeUsernameForm'
import type { UsernameSettingsQuery } from '@//:artifacts/UsernameSettingsQuery.graphql'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { formatDistanceStrict, isPast } from 'date-fns'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'

interface Props {
  query: PreloadedQuery<UsernameSettingsQuery>
}

const Query = graphql`
  query UsernameSettingsQuery @preloadable {
    viewer @required(action: THROW) {
      ...UsernameSettingsFragment
    }
  }
`

const Fragment = graphql`
  fragment UsernameSettingsFragment on Account {
    username
    usernameEditAvailableAt
  }
`

export default function UsernameSettings (props: Props): JSX.Element | null {
  const queryData = usePreloadedQuery<UsernameSettingsQuery>(
    Query,
    props.query
  )

  const data = useFragment<UsernameSettingsFragment$key>(Fragment, queryData.viewer)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const usernameTimer = new Date(data?.usernameEditAvailableAt as Date)

  const remainingTime = formatDistanceStrict(usernameTimer, new Date(), { locale })

  const canEditUsername = isPast(usernameTimer)
  return (
    <Stack spacing={4}>
      <SmallBackgroundBox
        w='100%'
        h='60px'
      >
        <Flex align='center'>
          <Text fontFamily='mono' fontSize='2xl' color='gray.00'>{data?.username}</Text>
        </Flex>
      </SmallBackgroundBox>
      <Collapse>
        <CollapseButton size='md'>
          <Trans>
            Change Username
          </Trans>
        </CollapseButton>
        <CollapseBody>
          <Stack spacing={2}>
            {!canEditUsername && (
              <Alert status='warning'>
                <AlertIcon />
                <AlertDescription>
                  <Trans>
                    You have recently made a username edit. You may edit your username again in {remainingTime}.
                  </Trans>
                </AlertDescription>
              </Alert>
            )}
            <ChangeUsernameForm isDisabled={!canEditUsername} />
          </Stack>
        </CollapseBody>
      </Collapse>
    </Stack>
  )
}
