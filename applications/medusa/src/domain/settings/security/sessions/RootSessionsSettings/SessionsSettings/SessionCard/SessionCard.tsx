import { graphql, useFragment } from 'react-relay/hooks'
import { AccordionButton, AccordionItem, AccordionPanel, Box, Flex, Heading, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import type { SessionCardFragment$key } from '@//:artifacts/SessionCardFragment.graphql'
import UAParser from 'ua-parser-js'
import { format } from 'date-fns'
import { ListSpacer } from '@//:modules/content/PageLayout'
import { DesktopComputer, MobilePhone } from '@//:assets/icons/interface'
import { t, Trans } from '@lingui/macro'
import RevokeSession from './RevokeSession/RevokeSession'
import { ArrowButtonDown, ArrowButtonUp } from '@//:assets/icons/navigation'
import { useLingui } from '@lingui/react'
import { dateFnsLocaleFromI18n } from '@//:modules/locale'

interface Props {
  connectionID: string
  query: SessionCardFragment$key
}

const SessionGQL = graphql`
  fragment SessionCardFragment on AccountSession {
    device
    ip
    location {
      city
      country
      subdivision
    }
    lastSeen
    current
    created
    ...RevokeSessionFragment
  }
`

export default function SessionCard ({
  connectionID,
  query
}: Props): JSX.Element {
  const data = useFragment(SessionGQL, query)

  const { i18n } = useLingui()
  const locale = dateFnsLocaleFromI18n(i18n)

  const userAgent = UAParser(data.device)
  const formattedDate = format(new Date(data.lastSeen as Date), 'LLLL Lo, y', { locale })
  const signedInDate = format(new Date(data.created as Date), 'LLLL Lo, y', { locale })

  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <AccordionButton>
            <Flex w='100%' align='center' justify='space-between'>
              <Box>
                <Flex mb={1} align='center'>
                  <Box
                    borderRadius='full'
                    borderWidth={1}
                    borderColor={data.current ? 'green.700' : 'gray.100'}
                    w={2}
                    h={2}
                    bg={data.current ? 'green.500' : 'gray.300'}
                  />
                  <Heading
                    ml={2}
                    color='gray.100'
                    fontSize='md'
                  >
                    <Trans>
                      {userAgent.browser.name} on {userAgent.os.name}
                    </Trans>
                  </Heading>
                </Flex>
                <Flex justify='space-between'>
                  <Text
                    color='gray.200'
                    fontSize='sm'
                  >{data.current ? t`Current Session` : t`Last Accessed ${formattedDate}`}
                  </Text>
                </Flex>
              </Box>
              <Box mr={3}>
                <Icon
                  w={10}
                  h={10}
                  icon={userAgent.device.type === 'mobile' ? MobilePhone : DesktopComputer}
                  fill='gray.300'
                />
              </Box>
            </Flex>
            <Icon
              icon={isExpanded ? ArrowButtonUp : ArrowButtonDown}
              fill='gray.300'
              w={4}
              h={4}
              ml={1}
            />
          </AccordionButton>
          <AccordionPanel>
            <ListSpacer>
              <Box>
                <Heading color='gray.200' fontSize='md'>
                  <Trans>
                    IP Address
                  </Trans>
                </Heading>
                <Text fontSize='sm'>
                  {data.ip}
                </Text>
              </Box>
              <Box>
                <Heading color='gray.200' fontSize='md'>
                  <Trans>
                    Location
                  </Trans>
                </Heading>
                {data.location.city === '' && data.location.subdivision === '' && data.location.country === ''
                  ? (
                    <Text fontSize='sm'>
                      <Trans>
                        Unknown
                      </Trans>
                    </Text>
                    )
                  : (
                    <Text fontSize='sm'>
                      {data.location.city}{data.location.subdivision !== '' ? `, ${data.location.subdivision}` : ''} {data.location.country !== '' ? ` (${data.location.country})` : ''}
                    </Text>
                    )}
              </Box>
              <Box>
                <Heading color='gray.200' fontSize='md'>
                  <Trans>
                    Last Login
                  </Trans>
                </Heading>
                <Text fontSize='sm'>
                  {signedInDate}
                </Text>
              </Box>
              {!data.current && <RevokeSession connectionID={connectionID} session={data} />}
            </ListSpacer>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
