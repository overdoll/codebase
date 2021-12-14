import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import { FormControl, FormLabel, HStack, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Button from '@//:modules/form/Button/Button'
import { graphql, useMutation } from 'react-relay/hooks'
import type { ChangeUsernameFormMutation } from '@//:artifacts/ChangeUsernameFormMutation.graphql'
import { useUsernameFormSchema } from '@//:modules/constants/schemas'
import StyledInput from '@//:modules/form/StyledInput/StyledInput'

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
    username: useUsernameFormSchema()
  })

  const [t] = useTranslation('settings')

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
          title: t('profile.username.modal.query.success'),
          isClosable: true
        })
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

  const success = isDirty && (errors.username == null) && isSubmitted

  return (
    <form noValidate onSubmit={handleSubmit(onChangeUsername)}>
      <FormControl
        isInvalid={errors.username != null}
        id='username'
      >
        <FormLabel>{t('profile.username.modal.header')}</FormLabel>
        <HStack align='flex-start'>
          <StyledInput
            register={register('username')}
            success={success}
            error={errors.username != null}
            placeholder={t('profile.username.modal.header')}
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
            {t('profile.username.modal.submit')}
          </Button>
        </HStack>
      </FormControl>
    </form>
  )
}
