/**
 * @flow
 */
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { SessionsSettingsQuery } from '@//:artifacts/SessionsSettingsQuery.graphql'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import type { SessionsSettingsFragment$key } from '@//:artifacts/SessionsSettingsFragment.graphql'
import {
  Stack, Box, Flex, Heading, Text, Menu, MenuButton, IconButton, MenuList, MenuItem
} from '@chakra-ui/react'
import UAParser from 'ua-parser-js'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import Icon from '@//:modules/content/Icon/Icon'
import MakePrimary from '../../../Profile/RootEmails/Emails/EmailCard/MakePrimary/MakePrimary'
import Resend from '../../../Profile/RootEmails/Emails/EmailCard/Resend/Resend'
import Delete from '../../../Profile/RootEmails/Emails/EmailCard/Delete/Delete'
import InterfaceSettingCog
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-cog.svg'
import InterfaceDeleteBin1
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/add-remove-delete/interface-delete-bin-1.svg'
import RevokeSession from './RevokeSession/RevokeSession'

type Props = {
  query: PreloadedQueryInner<SessionsSettingsQuery>,
}

const SessionsSettingsQueryGQL = graphql`
    query SessionsSettingsQuery {
        viewer {
            ...SessionsSettingsFragment
        }
    }
`

const SessionsGQL = graphql`
    fragment SessionsSettingsFragment on Account
    @argumentDefinitions(
        first: {type: Int, defaultValue: 3}
        after: {type: String}
    )
    @refetchable(queryName: "SessionsPaginationQuery" ) {
        sessions (first: $first, after: $after)
        @connection(key: "sessions_sessions") {
            __id
            edges {
                node {
                    ...RevokeSessionFragment
                    userAgent
                    ip
                    created
                    current
                }
            }
        }
    }
`

export default function MultiFactorSettings (props: Props): Node {
  const queryData = usePreloadedQuery<SessionsSettingsQuery>(
    SessionsSettingsQueryGQL,
    props.query
  )

  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<SessionsSettingsFragment$key,
    _>(
      SessionsGQL,
      queryData?.viewer
    )

  const [t] = useTranslation('settings')

  const sessions = data?.sessions.edges

  const sessionsConnectionID = data?.sessions?.__id

  return (
    <Stack mb={3}>
      {sessions.map((item, index) => {
        const userAgent = UAParser(item.node.userAgent)
        const formattedDate = format(new Date(item.node.created), 'LLLL Lo, y')
        return (
          <Box key={index} p={3} borderRadius='base' bg='gray.800'>
            <Flex mb={1} align='center'>
              <Box borderRadius='full' w={2} h={2} bg={item.current ? 'green.500' : 'gray.300'} />
              <Heading
                ml={2} color='gray.100'
                fontSize='md'
              >{t('security.sessions.on', { browser: userAgent.browser.name, device: userAgent.os.name })}
              </Heading>
            </Flex>
            <Flex justify='space-between'>
              <Flex direction='column'>
                <Text
                  color='gray.200'
                  fontSize='sm'
                >{item.node.current ? t('security.sessions.current') : t('security.sessions.accessed', { date: formattedDate })}
                </Text>
                <Text color='gray.200' fontSize='sm'>{item.node.ip}</Text>
              </Flex>
              <Flex align='flex-end'>
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
                  {!item.node.current &&
                    <MenuList boxShadow='xs'>
                      <RevokeSession session={item.node} connectionID={sessionsConnectionID} />
                    </MenuList>}
                </Menu>
              </Flex>
            </Flex>
          </Box>
        )
      }
      )}
    </Stack>
  )
}
