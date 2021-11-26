/**
 * @flow
 */
import type { PreloadedQueryInner } from 'react-relay/hooks'
import type { SessionsSettingsQuery } from '@//:artifacts/SessionsSettingsQuery.graphql'
import { graphql, usePreloadedQuery } from 'react-relay/hooks'
import { usePaginationFragment } from 'react-relay'
import { useState } from 'react'
import type { SessionsSettingsFragment$key } from '@//:artifacts/SessionsSettingsFragment.graphql'
import {
  Stack, Box, Flex, Heading, Text, Menu, MenuButton, IconButton, MenuList, useDisclosure
} from '@chakra-ui/react'
import UAParser from 'ua-parser-js'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceSettingCog
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/setting/interface-setting-cog.svg'
import RevokeSession from './RevokeSession/RevokeSession'
import Button from '@//:modules/form/Button'

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
    <>
      <Stack mb={3}>
        {sessions.map((item, index) => {
          const userAgent = UAParser(item.node.userAgent)
          const formattedDate = format(new Date(item.node.created), 'LLLL Lo, y')
          const { isOpen: isRevealed, onToggle } = useDisclosure()
          return (
            <Box key={index} p={3} borderRadius='base' bg='gray.800'>
              <Flex mb={1} align='center'>
                <Box borderRadius='full' w={2} h={2} bg={item.node.current ? 'green.500' : 'gray.300'} />
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
                  <Text
                    onClick={onToggle} color='gray.200'
                    fontSize='sm'
                  >{isRevealed ? item.node.ip : t('security.sessions.show')}
                  </Text>
                </Flex>
                <Flex align='flex-end'>
                  {!item.node.current &&
                    <Menu autoSelect={false}>
                      {({ isOpen }) => (
                        <>
                          <MenuButton
                              bg='transparent'
                              size='xs'
                              as={IconButton}
                              icon={<Icon icon={InterfaceSettingCog} w='fill' h='fill' fill='gray.300' m={1} />}
                            />
                          <MenuList display={isOpen ? 'block' : 'none'} boxShadow='xs'>
                              <RevokeSession session={item.node} connectionID={sessionsConnectionID} />
                            </MenuList>
                        </>
                      )}
                    </Menu>}
                </Flex>
              </Flex>
            </Box>
          )
        }
        )}
      </Stack>
      {hasNext &&
        <Flex justify='center'>
          <Button
            onClick={() => loadNext(3)} isLoading={isLoadingNext} color='gray.200'
            variant='link'
          >{t('security.sessions.load')}
          </Button>
        </Flex>}
    </>
  )
}
