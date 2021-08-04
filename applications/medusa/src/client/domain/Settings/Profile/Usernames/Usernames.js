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
  ListItem, UnorderedList,
  Text,
  ModalCloseButton,
  useToast,
  AlertIcon,
  Alert,
  AlertDescription
} from '@chakra-ui/react'

import { useTranslation } from 'react-i18next'

import { graphql, useFragment, useMutation } from 'react-relay/hooks'

import type { UsernamesMutation } from '@//:artifacts/UsernamesMutation.graphql'
import type { UsernamesSettingsFragment$key } from '@//:artifacts/UsernamesSettingsFragment.graphql'
import ChangeUsernameForm from './ChangeUsernameForm/ChangeUsernameForm'
import InfoTip from '../../../../components/InfoTip/InfoTip'

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

const UsernameMutationGQL = graphql`
  mutation UsernamesMutation($input: UpdateAccountUsernameAndRetainPreviousInput!, $connections: [ID!]!) {
    updateAccountUsernameAndRetainPrevious(input: $input) {
      accountUsername  {
        id
        username
        account @appendNode(connections: $connections, edgeTypeName: "UsernamesEdge"){
          id
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
  const [changeUsername, isChangingUsername] = useMutation<UsernamesMutation>(
    UsernameMutationGQL
  )

  const data = useFragment(UsernameFragmentGQL, usernames)

  const [t] = useTranslation('settings')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const notify = useToast()

  const usernamesConnectionID = data?.usernames?.__id

  const onChangeUsername = (formData) => {
    changeUsername({
      variables: {
        input: {
          username: formData.username
        },
        connections: [usernamesConnectionID]
      },
      onCompleted (data) {
        notify({
          status: 'success',
          title: t('profile.username.modal.query.success'),
          isClosable: true
        })
        onClose()
      },
      onError () {
        notify({
          status: 'error',
          title: t('profile.username.modal.query.error'),
          isClosable: true
        })
      }
    }
    )
  }

  return (
    <>
      <Heading size='lg' color='gray.00'>{t('profile.username.title')}</Heading>
      <Divider borderColor='gray.500' mt={1} mb={3} />
      <Stack spacing={3}>
        <Flex direction='column'>
          <Heading size='sm' color='gray.100'>{t('profile.username.current.title')}</Heading>
          <Flex align='center' direction='row' justify='space-between'>
            <Heading size='md' color='red.500'>{data?.username}</Heading>
            <Button onClick={onOpen} size='sm'>{t('profile.username.current.change')}</Button>
          </Flex>
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
                    <Text fontSize='sm' color='gray.100'>Your previous usernames are replaced</Text>
                    <InfoTip
                      text={t('profile.username.previous.tooltip')}
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg='gray.900'>
          <ModalHeader fontSize='md'>{t('profile.username.modal.header')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChangeUsernameForm onSubmit={onChangeUsername} loading={isChangingUsername} />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}
