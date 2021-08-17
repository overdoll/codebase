/**
 * @flow
 */
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage, useToast
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import { useForm } from 'react-hook-form'
import AlertCircle from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/alerts/alert-circle.svg'
import CheckDouble1
  from '@streamlinehq/streamlinehq/img/streamline-regular/interface-essential/form-validation/check-double-1.svg'
import InterfaceAlertWarningTriangle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/alerts/interface-alert-warning-triangle.svg'
import InterfaceValidationCheck
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check.svg'
import { joiResolver } from '@hookform/resolvers/joi'
import type { Node } from 'react'
import Button from '@//:modules/form/button'
import { graphql, useMutation } from 'react-relay/hooks'
import type { ChangeUsernameFormMutation } from '@//:artifacts/ChangeUsernameFormMutation.graphql'
import type { UsernamesSettingsFragment$key } from '@//:artifacts/UsernamesSettingsFragment.graphql'

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

// TODO create a username validator so all usernames can't be whatever you want them to be

// TODO look up custom messages for empty and invalid form errors

// TODO no native browser form configuration
const schema = Joi.object({
  username: Joi
    .string()
    .required()
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
            type: 'manual',
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
    <form onSubmit={handleSubmit(onChangeUsername)}>
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
          {errors.username && errors.username.message}
        </FormErrorMessage>
      </FormControl>
    </form>
  )
}
