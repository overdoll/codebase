/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { graphql, useFragment } from 'react-relay/hooks'
import { Box, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import type { SessionCardFragment$key } from '@//:artifacts/SessionCardFragment.graphql'
import UAParser from 'ua-parser-js'
import { format } from 'date-fns'
import { PagePanelWrap } from '@//:modules/content/PageLayout'
import { DesktopComputer, MobilePhone } from '../../../../../../../assets/icons/interface'

type Props = {
  connectionID: SessionCardFragment$key,
  query: SessionCardFragment$key,
}

const SessionGQL = graphql`
  fragment SessionCardFragment on AccountSession {
    ...RevokeSessionFragment
    device
    ip
    created
    current
  }
`

export default function SessionCard ({ connectionID, query }: Props): Node {
  const data = useFragment(SessionGQL, query)
  const [t] = useTranslation('settings')
  const { isOpen: isRevealed, onToggle } = useDisclosure()

  const userAgent = UAParser(data.device)
  const formattedDate = format(new Date(data.created), 'LLLL Lo, y')

  return (
    <PagePanelWrap path='/'>
      <Flex w='100%' align='center' justify='space-between'>
        <Box>
          <Flex mb={1} align='center'>
            <Box
              borderRadius='full'
              borderWidth={1}
              borderColor={data.current ? 'green.700' : 'gray.100'}
              w={2} h={2}
              bg={data.current ? 'green.500' : 'gray.300'}
            />
            <Heading
              ml={2} color='gray.100'
              fontSize='md'
            >{t('security.sessions.on', { browser: userAgent.browser.name, device: userAgent.os.name })}
            </Heading>
          </Flex>
          <Flex justify='space-between'>
            <Text
              color='gray.200'
              fontSize='sm'
            >{data.current ? t('security.sessions.current') : t('security.sessions.accessed', { date: formattedDate })}
            </Text>
          </Flex>
        </Box>
        <Box mr={3}>
          <Icon
            w={10} h={10}
            icon={userAgent.device.type === 'mobile' ? MobilePhone : DesktopComputer}
            fill='gray.300'
          />
        </Box>
      </Flex>
    </PagePanelWrap>
  )
}

// this is for the new session query
/*
{data.current &&
            <Menu autoSelect={false}>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    bg='transparent'
                    size='xs'
                    as={IconButton}
                    icon={<Icon icon={InterfaceSettingCog} w='fill' h='fill' fill='gray.300' m={1} />}
                  />
                  <MenuList display={isOpen ? 'block' : 'none'} boxShadow='lg'>
                    <RevokeSession session={data} connectionID={connectionID} />
                  </MenuList>
                </>
              )}
            </Menu>}
 */
