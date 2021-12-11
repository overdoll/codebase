/**
 * @flow
 */
import Joi from 'joi';
import { useTranslation } from 'react-i18next';
import { FormControl, FormLabel, HStack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import type { Node } from 'react';
import Button from '@//:modules/form/Button';
import { graphql, useMutation } from 'react-relay/hooks';
import type { ChangeUsernameFormMutation } from '@//:artifacts/ChangeUsernameFormMutation.graphql';
import type { UsernamesSettingsFragment$key } from '@//:artifacts/UsernamesSettingsFragment.graphql';
import { useUsernameFormSchema } from '@//:modules/constants/schemas';
import StyledInput from '@//:modules/form/StyledInput/StyledInput';

type UsernameValues = {
  username: string,
};

type Props = {
  usernamesConnectionID: UsernamesSettingsFragment$key
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

export default function ChangeUsernameForm ({ usernamesConnectionID }: Props): Node {
  const [changeUsername, isChangingUsername] = useMutation<ChangeUsernameFormMutation>(
    UsernameMutationGQL
  )

  const schema = Joi.object({
    username: useUsernameFormSchema()
  })

  const [t] = useTranslation('settings')

  const { register, setError, handleSubmit, formState: { errors, isDirty, isSubmitted } } = useForm<UsernameValues>({
    resolver: joiResolver(
      schema
    )
  })

  const notify = useToast()

  const onChangeUsername = (formData) => {
    changeUsername({
      variables: {
        input: {
          username: formData.username
        },
        connections: [usernamesConnectionID]
      },
      onCompleted (data) {
        if (data.updateAccountUsernameAndRetainPrevious.validation) {
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

  const success = isDirty && !errors.username && isSubmitted

  return (
    <form noValidate onSubmit={handleSubmit(onChangeUsername)}>
      <FormControl
        isInvalid={errors.username}
        id='username'
      >
        <FormLabel>{t('profile.username.modal.header')}</FormLabel>
        <HStack align='flex-start'>
          <StyledInput
            register={register('username')}
            success={success}
            error={errors.username}
            placeholder={t('profile.username.modal.header')}
            errorMessage={errors?.username?.message}
          />
          <Button
            size='sm'
            variant='solid'
            type='submit'
            colorScheme='gray'
            disabled={errors.username}
            isLoading={isChangingUsername}
          >
            {t('profile.username.modal.submit')}
          </Button>
        </HStack>
      </FormControl>
    </form>
  )
}
