import Joi from 'joi'
import { Alert, AlertDescription, AlertIcon, FormControl, FormLabel, HStack, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Button from '@//:modules/form/Button/Button'
import { graphql, useMutation } from 'react-relay/hooks'
import type { ChangeUsernameFormMutation } from '@//:artifacts/ChangeUsernameFormMutation.graphql'
import StyledInput from '@//:modules/form/StyledInput/StyledInput'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Username from '@//:modules/validation/Username'

interface UsernameValues {
  username: string
}

interface Props {
  usernamesConnectionID: string | undefined
  isDisabled: boolean
}

const UsernameMutationGQL = graphql`
  mutation ChangeUsernameFormMutation($input: UpdateAccountUsernameAndRetainPreviousInput!, $connections: [ID!]!) {
    updateAccountUsernameAndRetainPrevious(input: $input) {
      validation
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

export default function ChangeUsernameForm ({
  usernamesConnectionID,
  isDisabled
}: Props): JSX.Element {
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

  const onChangeUsername = (formData): void => {
    if (usernamesConnectionID == null) return

    changeUsername({
      variables: {
        input: {
          username: formData.username
        },
        connections: [usernamesConnectionID]
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
    <form noValidate onSubmit={handleSubmit(onChangeUsername)}>
      <FormControl
        isInvalid={errors.username != null}
        id='username'
      >
        {isDisabled &&
          <Alert mb={1} status='warning'>
            <AlertIcon />
            <AlertDescription fontSize='sm'>
              <Trans>
                You have added the maximum number of usernames. You have to remove at least one alias before you can
                change your username to a new one.
              </Trans>
            </AlertDescription>
          </Alert>}
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
            type='submit'
            colorScheme='gray'
            disabled={errors.username != null || isDisabled}
            isLoading={isChangingUsername}
          >
            <Trans>
              Submit
            </Trans>
          </Button>
        </HStack>
      </FormControl>
    </form>
  )
}
