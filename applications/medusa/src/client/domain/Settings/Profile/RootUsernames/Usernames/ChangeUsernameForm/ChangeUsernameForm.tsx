import Joi from 'joi'
import { FormControl, FormLabel, HStack, useToast } from '@chakra-ui/react'
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
  usernamesConnectionID: string
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

export default function ChangeUsernameForm ({ usernamesConnectionID }: Props): JSX.Element {
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
  )
}
