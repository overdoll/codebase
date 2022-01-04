import { Alert, AlertDescription, AlertIcon, Collapse, Flex, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { graphql, PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay/hooks'
import type { UsernamesSettingsFragment$key } from '@//:artifacts/UsernamesSettingsFragment.graphql'
import ChangeUsernameForm from './ChangeUsernameForm/ChangeUsernameForm'
import type { UsernamesQuery } from '@//:artifacts/UsernamesQuery.graphql'
import Button from '@//:modules/form/Button/Button'
import { ListSpacer, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { formatDistanceStrict, isPast } from 'date-fns'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'

const UsernameQueryGQL = graphql`
  query UsernamesQuery {
    viewer {
      ...UsernamesSettingsFragment
    }
  }
`

const UsernameFragmentGQL = graphql`
  fragment UsernamesSettingsFragment on Account {
    username
    usernameEditAvailableAt
  }
`

interface Props {
  query: PreloadedQuery<UsernamesQuery>
}

export default function Usernames (props: Props): JSX.Element | null {
  const queryData = usePreloadedQuery<UsernamesQuery>(
    UsernameQueryGQL,
    props.query
  )

  const data = useFragment<UsernamesSettingsFragment$key>(UsernameFragmentGQL, queryData?.viewer)

  const {
    isOpen: isFormOpen,
    onToggle: onToggleForm
  } = useDisclosure()

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const usernameTimer = new Date(data?.usernameEditAvailableAt as Date)

  const remainingTime = formatDistanceStrict(usernameTimer, new Date(), { locale })

  const canEditUsername = isPast(usernameTimer)

  return (
    <>
      <ListSpacer>
        <SmallBackgroundBox
          w='100%'
          h='60px'
        >
          <Flex align='center'>
            <Text fontFamily='mono' fontSize='2xl' color='gray.00'>{data?.username}</Text>
          </Flex>
        </SmallBackgroundBox>
        <Button
          variant='solid'
          colorScheme='gray'
          onClick={onToggleForm}
          size='sm'
        >
          <Trans>
            Change Username
          </Trans>
        </Button>
        <Collapse in={isFormOpen} animateOpacity>
          <Stack spacing={2}>
            <Alert status='warning'>
              <AlertIcon />
              <AlertDescription>
                <Trans>
                  You have recently made a username edit. You may edit your username again in {remainingTime}.
                </Trans>
              </AlertDescription>
            </Alert>
            <ChangeUsernameForm isDisabled={!canEditUsername} />
          </Stack>
        </Collapse>
      </ListSpacer>
    </>
  )
}
