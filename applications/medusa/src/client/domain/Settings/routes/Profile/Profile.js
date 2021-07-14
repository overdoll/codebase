/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect, Suspense } from 'react'
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary'
import { Helmet } from 'react-helmet-async'
import {
  Center,
  Flex,
  Heading,
  Divider,
  Text,
  Button,
  Skeleton,
  Stack,
  Tooltip,
  Spinner,
  Box,
  Badge,
  Input, MenuButton, IconButton, MenuList, MenuItem, Avatar, MenuDivider, Menu
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { graphql, usePreloadedQuery, useQueryLoader } from 'react-relay/hooks'
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { RootQuery } from '@//:artifacts/RootQuery.graphql'
import ErrorFallback from '../../../../components/ErrorFallback/ErrorFallback'
import Icon from '@//:modules/content/icon/Icon'
import InterfaceAlertInformationCircle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/alerts/interface-alert-information-circle.svg'
import InfoTip from '../../../../components/InfoTip/InfoTip'
import Link from '@//:modules/routing/Link'

import InterfaceSettingMenuHorizontalAlternate
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-menu-horizontal-alternate.svg'
import InterfaceDeleteBin1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/add-remove-delete/interface-delete-bin-1.svg'
import InterfaceSettingWrench
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-wrench.svg'
import MailSendEnvelope from '@streamlinehq/streamlinehq/img/streamline-mini-bold/mail/send/mail-send-envelope.svg'
import InterfaceSettingCog
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-cog.svg'

type Props = {
  profileQuery: PreloadedQueryInner<ProfileSettingsQuery>,
};

const generalSettingsGQL = graphql`
  query ProfileSettingsQuery {
    accountSettings {
      accountId
      general {
        emails {
          email
          status
        }
        usernames {
          username
        }
      }
    }
    authenticatedAccount{
      username
    }
  }
`

export default function Profile (props: Props): Node {
  const [queryRef, loadQuery] = useQueryLoader<RootQuery>(
    generalSettingsGQL,
    props.profileQuery
  )

  useEffect(() => {
    loadQuery()
  }, [])

  const [t] = useTranslation('settings')

  return (
    <>
      <Helmet title='profile' />
      <Center mt={8}>
        <Flex
          w={['full', 'sm', 'md', 'lg']}
          pl={[1, 0]}
          pr={[1, 0]}
          direction='column'
          mb={6}
        >

          <ErrorBoundary
            fallback={({ error, reset }) => (
              <ErrorFallback error={error} reset={reset} refetch={loadQuery} />
            )}
          >
            <Suspense fallback={null}>
              {queryRef != null
                ? <Content query={generalSettingsGQL} queryRef={queryRef} />
                : <Flex justify='center'>
                  <Spinner size='lg' color='red.500' />
                </Flex>}
            </Suspense>
          </ErrorBoundary>
        </Flex>
      </Center>
    </>
  )
}

const Content = ({ query, queryRef }) => {
  const data = usePreloadedQuery<RootQuery>(
    query,
    queryRef
  )

  const usernames = data.accountSettings.general.usernames

  const [primaryEmail, confirmedEmails, unconfirmedEmails] = [
    data.accountSettings.general.emails.filter((item) => { return item.status === 'PRIMARY' })[0],
    data.accountSettings.general.emails.filter((item) => { return item.status === 'CONFIRMED' }),
    data.accountSettings.general.emails.filter((item) => { return item.status === 'UNCONFIRMED' })
  ]

  return (
    <>
      <Heading size='lg' color='gray.00'>Username</Heading>
      <Divider borderColor='gray.500' mt={1} mb={3} />
      <Stack spacing={3}>
        <Flex direction='row' justify='space-between'>
          <Heading size='md' color='gray.100'>{data.authenticatedAccount.username}</Heading>
          <Button size='sm'>Change Username</Button>
        </Flex>
        {usernames.length > 0 &&
          <Flex direction='column'>
            <Flex>
              <Heading size='sm' color='gray.100'>Previous Usernames</Heading>
              <InfoTip
                text='If a link with an old username is clicked, it will redirect to the new username. This behaviour may change in the future.'
                size={3}
              />
            </Flex>
            <Flex>
              <Text fontSize='sm' color='gray.200'>
                Any previous usernames you had under this account will show up here
              </Text>
            </Flex>
          </Flex>}
      </Stack>
      <Heading mt={8} size='lg' color='gray.00'>Emails</Heading>
      <Divider borderColor='gray.500' mt={1} mb={3} />
      <Stack spacing={3} mb={3}>
        <Box borderWidth={1} borderColor='green.500' bg='gray.800' p={4} borderRadius={5}>
          <Flex align='flex-start' direction='column'>
            <Flex mb={1} align='center' w='100%' direction='row'>
              <Flex wordBreak='break-all' w='80%'>
                <Heading size='sm'>
                  {primaryEmail.email}
                </Heading>
              </Flex>
              <Flex justify='flex-end' w='20%'>
                <Badge colorScheme='green'>Primary</Badge>
              </Flex>
            </Flex>
            <Flex align='center' direction='column'>
              <Text color='gray.200' fontSize='sm'>Used in the Join page</Text>
              <Text color='gray.200' fontSize='sm'>Receives login emails</Text>
            </Flex>
          </Flex>
        </Box>
        <Box borderWidth={2} borderColor='gray.800' p={4} borderRadius={5}>
          <Flex align='flex-start' direction='column'>
            <Flex mb={1} align='center' w='100%' direction='row'>
              <Flex wordBreak='break-all' w='75%'>
                <Heading size='sm'>
                  {primaryEmail.email}
                </Heading>
              </Flex>
              <Flex justify='flex-end' w='25%'>
                <Badge colorScheme='purple'>Confirmed</Badge>
              </Flex>
            </Flex>
            <Flex w='100%' align='center' justify='space-between'>
              <Text color='gray.200' fontSize='sm'>Can be set as Primary</Text>
              <Menu autoSelect={false}>
                <MenuButton
                  bg='transparent'
                  size='xs'
                  as={IconButton}
                  icon={
                    <Icon
                      icon={InterfaceSettingCog} w='fill' h='fill'
                      fill='gray.300' m={1}
                    />
                  }
                />
                <MenuList boxShadow='xs'>
                  <MenuItem justify='center'>
                    <Icon pointerEvents='none' icon={InterfaceSettingWrench} fill='gray.100' w={4} h={4} mr={2} />
                    <Text pointerEvents='none' color='gray.100'>Set Primary</Text>
                  </MenuItem>
                  <MenuItem justify='center'>
                    <Icon pointerEvents='none' icon={InterfaceDeleteBin1} fill='orange.300' w={4} h={4} mr={2} />
                    <Text pointerEvents='none' color='orange.300'>Remove</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Box>
        <Box borderWidth={2} borderColor='gray.800' p={4} borderRadius={5}>
          <Flex align='flex-start' direction='column'>
            <Flex mb={1} align='center' w='100%' direction='row'>
              <Flex wordBreak='break-all' w='70%'>
                <Heading size='sm'>
                  {primaryEmail.email}
                </Heading>
              </Flex>
              <Flex justify='flex-end' w='30%'>
                <Badge colorScheme='orange'>Unconfirmed</Badge>
              </Flex>
            </Flex>
            <Flex w='100%' align='center' justify='space-between'>
              <Text color='gray.200' fontSize='sm'>Needs to be confirmed through email link</Text>
              <Menu autoSelect={false}>
                <MenuButton
                  bg='transparent'
                  size='xs'
                  as={IconButton}
                  icon={
                    <Icon
                      icon={InterfaceSettingCog} w='fill' h='fill'
                      fill='gray.300' m={1}
                    />
                  }
                />
                <MenuList boxShadow='xs'>
                  <MenuItem justify='center'>
                    <Icon pointerEvents='none' icon={MailSendEnvelope} fill='gray.100' w={4} h={4} mr={2} />
                    <Text pointerEvents='none' color='gray.100'>Resend Email</Text>
                  </MenuItem>
                  <MenuItem justify='center'>
                    <Icon pointerEvents='none' icon={InterfaceDeleteBin1} fill='orange.300' w={4} h={4} mr={2} />
                    <Text pointerEvents='none' color='orange.300'>Remove</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Box>
      </Stack>
      <Heading mb={1} size='sm' color='gray.00'>Add an email</Heading>
      <Flex>
        <Input
          size='sm'
          placeholder='Enter an email address'
          variant='outline'
          mb={4} mr={2}
        />
        <Button size='sm'>Add</Button>
      </Flex>
    </>
  )
}
