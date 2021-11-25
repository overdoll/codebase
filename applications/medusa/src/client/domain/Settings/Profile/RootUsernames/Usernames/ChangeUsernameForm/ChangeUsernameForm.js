/**
 * @flow
 */
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage, useToast
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { useForm } from 'react-hook-form'
import InterfaceAlertWarningTriangle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/alerts/interface-alert-warning-triangle.svg'
import InterfaceValidationCheck
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check.svg'
import { joiResolver } from '@hookform/resolvers/joi'
import type { Node } from 'react'
import Button from '@//:modules/form/Button'
import { graphql, useMutation } from 'react-relay/hooks'
import type { ChangeUsernameFormMutation } from '@//:artifacts/ChangeUsernameFormMutation.graphql'
import type { UsernamesSettingsFragment$key } from '@//:artifacts/UsernamesSettingsFragment.graphql'
import { usernameSchema } from '@//:modules/constants/schemas/FormSchemas'

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

// TODO look up custom messages for empty and invalid form errors

const schema = Joi.object({
  username: usernameSchema
})

export default function ChangeUsernameForm ({ usernamesConnectionID }: Props): Node {
  const [changeUsername, isChangingUsername] = useMutation<ChangeUsernameFormMutation>(
    UsernameMutationGQL
  )

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
        <Flex justify='center'>
          <InputGroup mr={2} size='sm'>
            <Input
              {...register('username')}
              variant='outline'
              placeholder={t('profile.username.modal.header')}
            />
            {(errors.username || success) && (
              <InputRightElement mr={1}>
                <Icon
                  m={2}
                  icon={success ? InterfaceValidationCheck : InterfaceAlertWarningTriangle}
                  fill={success ? 'green.600' : 'orange.500'}
                />
              </InputRightElement>
            )}
          </InputGroup>
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
        </Flex>
        <FormErrorMessage>
          {errors.username && errors.username.type === 'mutation' && errors.username.message}
          {errors.username && errors.username.type === 'string.empty' && t('profile.username.modal.form.validation.username.empty')}
          {errors.username && errors.username.type === 'string.min' && t('profile.username.modal.form.validation.username.min')}
          {errors.username && errors.username.type === 'string.max' && t('profile.username.modal.form.validation.username.max')}
          {errors.username && errors.username.type === 'string.alphanum' && t('profile.username.modal.form.validation.username.alphanum')}
        </FormErrorMessage>
      </FormControl>
    </form>
  )
}
