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
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Button from '@//:modules/form/Button/Button'
import { graphql, useMutation } from 'react-relay/hooks'
import type { ChangeUsernameFormMutation } from '@//:artifacts/ChangeUsernameFormMutation.graphql'
import StyledInput from '@//:modules/form/StyledInput/StyledInput'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Username from '@//:modules/validation/Username'
import { useHistoryDisclosure } from '@//:modules/hooks'
import { useRef, useState } from 'react'

interface UsernameValues {
  username: string
}

const UsernameMutationGQL = graphql`
  mutation ChangeUsernameFormMutation($input: UpdateAccountUsernameAndRetainPreviousInput!) {
    updateAccountUsernameAndRetainPrevious(input: $input) {
      validation
      accountUsername  {
        id
        username
      }
    }
  }
`

export default function ChangeUsernameForm (): JSX.Element {
  const [changeUsername, isChangingUsername] = useMutation<ChangeUsernameFormMutation>(
    UsernameMutationGQL
  )

  const schema = Joi.object({
    username: Username()
  })

  const {
    register,
    setError,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      isSubmitted
    }
  } = useForm<UsernameValues>({
    resolver: joiResolver(
      schema
    )
  })

  const notify = useToast()

  const { i18n } = useLingui()

  const [selectedUsername, setSelectedUsername] = useState<string | null>(null)

  const {
    isOpen: isConfirmationOpen,
    onOpen: onOpenConfirmation,
    onClose: onCloseConfirmation
  } = useHistoryDisclosure()

  const cancelButtonRef = useRef(null)

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
        if (data?.updateAccountUsernameAndRetainPrevious?.validation != null) {
          setError('username', {
            type: 'mutation',
            message: data.updateAccountUsernameAndRetainPrevious.validation
          })
          return
        }
        notify({
          status: 'success',
          title: t`Username changed successfully`,
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error changing your username`,
          isClosable: true
        })
      }
    }
    )
  }

  const success = isDirty && (errors.username == null) && isSubmitted

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onDataConfirmed)}>
        <FormControl
          isInvalid={errors.username != null}
          id='username'
        >
          <FormLabel>
            <Trans>
              Enter a new username
            </Trans>
          </FormLabel>
          <HStack align='flex-start'>
            <StyledInput
              register={register('username')}
              success={success}
              error={errors.username != null}
              placeholder={i18n._(t`Enter a new username`)}
              errorMessage={errors?.username?.message}
            />
            <Button
              size='sm'
              variant='solid'
              colorScheme='gray'
              type='submit'
              disabled={errors.username != null}
              isLoading={isChangingUsername}
            >
              <Trans>
                Submit
              </Trans>
            </Button>
          </HStack>
        </FormControl>
      </form>
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
          <AlertDialogCloseButton />
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
                  </Trans>
                </Text>
                <Text color='green.300'>
                  {selectedUsername}
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
