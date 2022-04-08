import Joi from 'joi'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  HStack,
  Stack,
  Text
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Button from '@//:modules/form/Button/Button'
import { graphql, useMutation } from 'react-relay/hooks'
import type { ChangeUsernameFormMutation } from '@//:artifacts/ChangeUsernameFormMutation.graphql'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Username from '@//:modules/validation/Username'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { useRef, useState } from 'react'
import translateValidation from '@//:modules/validation/translateValidation'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFooter,
  InputHeader,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import HighlightInline from '../../../../../../components/ContentHints/HighlightInline/HighlightInline'

interface UsernameValues {
  username: string
}

interface Props {
  isDisabled: boolean
}

const UsernameMutationGQL = graphql`
  mutation ChangeUsernameFormMutation($input: UpdateAccountUsernameInput!) {
    updateAccountUsername(input: $input) {
      validation
      account  {
        id
        username
      }
    }
  }
`

export default function ChangeUsernameForm ({ isDisabled }: Props): JSX.Element {
  const [changeUsername, isChangingUsername] = useMutation<ChangeUsernameFormMutation>(
    UsernameMutationGQL
  )

  const [selectedUsername, setSelectedUsername] = useState<string | null>(null)

  const {
    isOpen: isConfirmationOpen,
    onOpen: onOpenConfirmation,
    onClose: onCloseConfirmation
  } = useHistoryDisclosure()

  const cancelButtonRef = useRef(null)

  const schema = Joi.object({
    username: Username()
  })

  const methods = useForm<UsernameValues>({
    resolver: joiResolver(
      schema
    )
  })

  const { setError } = methods

  const notify = useToast()

  const { i18n } = useLingui()

  const onDataConfirmed = (formData): void => {
    setSelectedUsername(formData.username)
    onOpenConfirmation()
  }

  const onChangeUsername = (): void => {
    if (selectedUsername == null) return

    onCloseConfirmation()

    changeUsername({
      variables: {
        input: {
          username: selectedUsername
        }
      },
      onCompleted (data) {
        if (data?.updateAccountUsername?.validation != null) {
          setError('username', {
            type: 'mutation',
            message: i18n._(translateValidation(data.updateAccountUsername.validation))
          })
          return
        }
        notify({
          status: 'success',
          title: t`Username changed successfully`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error changing your username`
        })
      }
    })
  }

  return (
    <>
      <Form {...methods} onSubmit={onDataConfirmed}>
        <FormInput size='md' id='username'>
          <InputHeader>
            <Trans>
              Enter a new username
            </Trans>
          </InputHeader>
          <HStack align='flex-start'>
            <InputBody>
              <TextInput placeholder={i18n._(t`Enter a new username`)} />
            </InputBody>
            <FormSubmitButton
              size='md'
              isDisabled={isDisabled}
              isLoading={isChangingUsername}
            >
              <Trans>
                Submit
              </Trans>
            </FormSubmitButton>
          </HStack>
          <InputFooter />
        </FormInput>
      </Form>
      <AlertDialog
        preserveScrollBarGap
        isCentered
        leastDestructiveRef={cancelButtonRef}
        isOpen={isConfirmationOpen}
        onClose={onCloseConfirmation}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Trans>
              Confirm Username Change
            </Trans>
          </AlertDialogHeader>
          <AlertDialogCloseButton
            size='lg'
            as={CloseButton}
          />
          <AlertDialogBody>
            <Stack spacing={2}>
              <Text>
                <Trans>
                  Changing your to a different one username will break any links that include your current username.
                </Trans>
              </Text>
              <Text>
                <Trans>
                  In addition, you won't be able to change your username for 30 days after confirming.
                </Trans>
              </Text>
              <Box>
                <Text>
                  <Trans>
                    Are you sure you'd like to change your username to
                  </Trans> <HighlightInline colorScheme='green'>{selectedUsername as string}</HighlightInline>
                </Text>
              </Box>
            </Stack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button variant='solid' size='lg' onClick={onCloseConfirmation}>
              <Trans>
                Go back
              </Trans>
            </Button>
            <Button
              onClick={onChangeUsername}
              ml={3}
              size='lg'
              colorScheme='green'
              variant='solid'
            >
              <Trans>
                Yes, change
              </Trans>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
