/**
 * @flow
 */
import type { Node } from 'react'
import {
  Button, Divider, Flex, Heading, Stack, useDisclosure, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody, Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  ModalCloseButton,
  useToast,
  SlideFade,
  Collapse
} from '@chakra-ui/react'

import { useTranslation } from 'react-i18next'

import { graphql, useFragment, useMutation } from 'react-relay/hooks'

import type { UsernamesMutation } from '@//:artifacts/UsernamesMutation.graphql'
import type { UsernamesSettingsFragment$key } from '@//:artifacts/UsernamesSettingsFragment.graphql'
import ChangeUsernameForm from './ChangeUsernameForm/ChangeUsernameForm'
import InfoTip from '../../../../../components/InfoTip/InfoTip'

const UsernameFragmentGQL = graphql`
  fragment UsernamesSettingsFragment on Account {
    username
    usernames(first: $first) @connection(key: "UsernamesSettingsFragment_usernames" ) {
      __id
      edges {
        node {
          username
        }
      }
    }
  }
`

type Props = {
  usernames: UsernamesSettingsFragment$key
}

export default function Usernames ({ usernames }: Props): Node {
  const data = useFragment(UsernameFragmentGQL, usernames)

  const [t] = useTranslation('settings')

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()

  const usernamesConnectionID = data?.usernames?.__id

  return (
    <>
      <Heading size='lg' color='gray.00'>{t('profile.username.title')}</Heading>
      <Divider borderColor='gray.500' mt={1} mb={3} />
      <Stack spacing={3}>
        <Flex direction='column'>
          <Heading size='sm' color='gray.100'>{t('profile.username.current.title')}</Heading>
          <Flex align='center' direction='row' justify='space-between'>
            <Heading size='md' color='red.500'>{data?.username}</Heading>
            <Button onClick={onToggle} size='sm'>{t('profile.username.current.change')}</Button>
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <Flex mt={3}>
              <ChangeUsernameForm usernamesConnectionID={usernamesConnectionID} />
            </Flex>
          </Collapse>
        </Flex>
        {data?.usernames.edges.length > 0 &&
          <Flex direction='column'>
            <Accordion allowToggle>
              <AccordionItem border='none'>
                <AccordionButton pl={0} pr={0} borderRadius={5} justify='space-between'>
                  <Flex w='100%'>
                    <Heading
                      size='sm'
                      color='gray.100'
                    >{t('profile.username.previous.title')} ({data.usernames.edges.length})
                    </Heading>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pl={0} pr={0}>
                  <Flex mb={1}>
                    <Text fontSize='sm' color='gray.100'>{t('profile.username.previous.tooltip.title')}</Text>
                    <InfoTip
                      text={t('profile.username.previous.tooltip.hint')}
                    />
                  </Flex>
                  {data.usernames.edges.map((item, index) =>
                    <Text key={index} color='gray.200'>{item.node.username}</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>}
      </Stack>

    </>
  )
}
