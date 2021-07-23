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
  ModalCloseButton, Input, FormControl, FormLabel, InputGroup, InputRightElement, FormHelperText, useToast
} from '@chakra-ui/react'

import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { graphql, useMutation } from 'react-relay/hooks'

import AlertCircle from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/alerts/alert-circle.svg'
import CheckDouble1
  from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/form-validation/check-double-1.svg'
import type { UsernameMutation } from '@//:artifacts/UsernameMutation.graphql'

const UsernameMutationGQL = graphql`
  mutation UsernameMutation($input: UpdateAccountUsernameAndRetainPreviousInput!) {
    updateAccountUsernameAndRetainPrevious(input: $input) {
      accountUsername {
        username
      }
    }
  }
`

type UsernameValues = {
  username: string,
};

type Props = {
  username: string,
  usernames: Array<String>,
  refresh: () => void,
}

const schema = Joi.object({
  username: Joi
    .string()
    .required()
})

export default function Username ({ username, usernames, refresh }: Props): Node {
  const [commit, isInFlight] = useMutation<UsernameMutation>(
    UsernameMutationGQL
  )

  const [t] = useTranslation('settings')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const notify = useToast()

  const { register, handleSubmit, formState: { errors, isDirty, isSubmitted } } = useForm<UsernameValues>({
    resolver: joiResolver(
      schema
    )
  })

  const success = isDirty && !errors.username && isSubmitted

  const onSubmit = (formData) => {
    commit({
      variables: {
        username: formData.username
      },
      onCompleted (data) {
        if (data.modifyAccountUsername.ok) {
          notify({
            status: 'success',
            title: t('profile.username.modal.query.success'),
            isClosable: true
          })
          refresh()
          onClose()
        } else {
          notify({
            status: 'error',
            title: data.modifyAccountUsername.validation.code,
            isClosable: true
          })
        }
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
            <Heading size='md' color='red.500'>{username}</Heading>
            <Button onClick={onOpen} size='sm'>{t('profile.username.current.change')}</Button>
          </Flex>
        </Flex>
        {usernames.length > 0 &&
          <Flex direction='column'>
            <Accordion allowToggle>
              <AccordionItem border='none'>
                <AccordionButton pl={0} pr={0} borderRadius={5} justify='space-between'>
                  <Flex w='100%'>
                    <Heading
                      size='sm'
                      color='gray.100'
                    >{t('profile.username.previous.title')} ({usernames.length})
                    </Heading>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pt={1}>
                  <Text mb={1} fontSize='sm' color='gray.200'>{t('profile.username.previous.tooltip')}</Text>
                  <UnorderedList pl={4}>
                    {usernames.map((item, index) =>
                      <ListItem key={index} color='gray.200'>{item.username}</ListItem>
                    )}
                  </UnorderedList>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                isInvalid={errors.username}
                id='username'
              >
                <FormLabel
                  htmlFor='username'
                  variant='float'
                  color={!success
                    ? errors.username
                      ? 'orange.500'
                      : 'gray.200'
                    : 'green.600'}
                >
                  {t('profile.username.modal.input_title')}
                </FormLabel>
                <InputGroup size='xl'>
                  <Input
                    {...register('username')}
                    variant='filled'
                    placeholder={t('profile.username.modal.header')}
                    isInvalid={errors.username}
                  />
                  {(errors.username || success) && (
                    <InputRightElement>
                      <Icon
                        icon={success ? CheckDouble1 : AlertCircle}
                        color={success ? 'green.600' : 'orange.500'}
                        m={4}
                      />
                    </InputRightElement>
                  )}
                </InputGroup>
                <FormHelperText>
                  {errors.username && t('profile.username.modal.form.validation.username.required')}
                </FormHelperText>
              </FormControl>
              <Button
                size='lg'
                variant='solid'
                type='submit'
                colorScheme='green'
                w='100%'
                isDisabled={errors.username}
                isLoading={isInFlight}
              >
                {t('profile.username.modal.submit')}
              </Button>
            </form>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}
