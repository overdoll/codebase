import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { DeleteAccountSettingsQuery } from '@//:artifacts/DeleteAccountSettingsQuery.graphql'
import { Flex, HStack, Stack, Text } from '@chakra-ui/react'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'
import format from 'date-fns/format'
import { dateFormatWithTime } from '@//:modules/constants/format'
import { Collapse, CollapseBody, CollapseButton } from '@//:modules/content/ThemeComponents/Collapse/Collapse'
import { Trans } from '@lingui/macro'
import DeleteAccountForm from './DeleteAccountForm/DeleteAccountForm'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import CancelAccountDeletionButton from './CancelAccountDeletionButton/CancelAccountDeletionButton'

interface Props {
  query: PreloadedQuery<DeleteAccountSettingsQuery>
}

const Query = graphql`
  query DeleteAccountSettingsQuery @preloadable {
    viewer @required(action: THROW) {
      deleting {
        scheduledDeletion
      }
      hasActiveOrCancelledAccountClubSupporterSubscriptions
      hasNonTerminatedClubs
      ...DeleteAccountFormFragment
      ...CancelAccountDeletionButtonFragment
    }
  }
`

export default function DeleteAccountSettings (props: Props): JSX.Element {
  const queryData = usePreloadedQuery<DeleteAccountSettingsQuery>(
    Query,
    props.query
  )

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const cannotDelete = queryData.viewer.hasActiveOrCancelledAccountClubSupporterSubscriptions || queryData.viewer.hasNonTerminatedClubs

  if (queryData.viewer.deleting == null) {
    return (
      <Stack spacing={8}>
        <Stack spacing={2}>
          <Text fontSize='md' color='gray.100'>
            <Trans>
              If you are no longer using your account and would like to delete it, you may do so from this page. We will
              honor your request and schedule a deletion on your account.
            </Trans>
          </Text>
          <Text fontSize='md' color='gray.100'>
            <Trans>
              You will receive a confirmation email and then one more reminder email before your account is fully
              deleted. This is to ensure that you are the one that actually requested the deletion.
            </Trans>
          </Text>
          <Text fontSize='md' color='gray.100'>
            <Trans>
              You may cancel the deletion of your account at any time before the scheduled deletion date.
            </Trans>
          </Text>
          {queryData.viewer.hasActiveOrCancelledAccountClubSupporterSubscriptions && (
            <Alert
              status='warning'
            >
              <Flex
                w='100%'
                align='center'
                justify='space-between'
              >
                <HStack spacing={0} align='center'>
                  <AlertIcon />
                  <AlertDescription>
                    <Trans>
                      You cannot delete your account until you cancel your subscriptions and wait for them to expire
                    </Trans>
                  </AlertDescription>
                </HStack>
                <LinkButton
                  href='/settings/billing/subscriptions'
                  size='sm'
                  colorScheme='orange'
                  variant='solid'
                >
                  <Trans>
                    My Subscriptions
                  </Trans>
                </LinkButton>
              </Flex>
            </Alert>
          )}
          {queryData.viewer.hasNonTerminatedClubs && (
            <Alert
              status='warning'
            >
              <HStack spacing={0} align='center'>
                <AlertIcon />
                <AlertDescription>
                  <Trans>
                    You cannot delete your account because you currently own a club. Please contact hello@overdoll.com
                    to have your club terminated.
                  </Trans>
                </AlertDescription>
              </HStack>
            </Alert>
          )}
        </Stack>
        <Collapse>
          <CollapseButton isDisabled={cannotDelete} size='md'>
            <Trans>
              Delete Account
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <DeleteAccountForm query={queryData.viewer} />
          </CollapseBody>
        </Collapse>
      </Stack>
    )
  }

  const scheduledDeletion = format(new Date(queryData.viewer.deleting.scheduledDeletion as Date), dateFormatWithTime, { locale })

  return (
    <Stack spacing={4}>
      <Alert>
        <HStack spacing={0} align='center'>
          <AlertIcon />
          <AlertDescription>
            <Trans>
              You have requested to delete your account. Unless you cancel the action, your account is scheduled to be
              deleted on {scheduledDeletion}.
            </Trans>
          </AlertDescription>
        </HStack>
      </Alert>
      <CancelAccountDeletionButton query={queryData.viewer} />
    </Stack>
  )
}
