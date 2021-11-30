/**
 * @flow
 */

import { graphql, useMutation } from 'react-relay/hooks'
import {
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement, useToast,
  FormLabel, FormErrorMessage,
  HStack
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import type { AddEmailFormMutation } from '@//:artifacts/AddEmailFormMutation.graphql'
import Button from '@//:modules/form/Button'

import InterfaceAlertWarningTriangle
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/alerts/interface-alert-warning-triangle.svg'
import InterfaceValidationCheck
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/validation/interface-validation-check.svg'
import InterfaceArrowsRight
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/arrows/interface-arrows-right.svg'
import MailSignAt from '@streamlinehq/streamlinehq/img/streamline-mini-bold/mail/signs/mail-sign-at.svg'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import type { EmailsSettingsFragment$key } from '@//:artifacts/EmailsSettingsFragment.graphql'
import IconButton from '@//:modules/form/IconButton'
import { useEmailFormSchema } from '@//:modules/constants/schemas'
import StyledInput from '@//:modules/form/StyledInput/StyledInput'

type EmailValues = {
  email: string,
};

type Props = {
  connectionID: EmailsSettingsFragment$key,
}

const AddEmailMutationGQL = graphql`
  mutation AddEmailFormMutation($input: AddAccountEmailInput!, $connections: [ID!]!) {
    addAccountEmail(input: $input) {
      accountEmail @appendNode(connections: $connections, edgeTypeName: "updateEmailPrimaryEdge") {
        id
        email
        status
      }
    }
  }
`

export default function AddEmailForm ({ connectionID }: Props): Node {
  const [t] = useTranslation('settings')

  const schema = Joi.object({
    email: useEmailFormSchema()
  })

  const { register, setError, handleSubmit, formState: { errors, isDirty, isSubmitted } } = useForm<EmailValues>({
    resolver: joiResolver(
      schema
    )
  })

  const success = isDirty && !errors.email && isSubmitted

  const [addEmail, isAddingEmail] = useMutation<AddEmailFormMutation>(
    AddEmailMutationGQL
  )

  const formReveal = errors.email || success

  const notify = useToast()

  const onAddEmail = (formData) => {
    addEmail({
      variables: {
        input: {
          email: formData.email
        },
        connections: [connectionID]
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t('profile.email.add.query.success', { email: formData.email }),
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('profile.email.add.query.error'),
          isClosable: true
        })
      }
    }
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit(onAddEmail)}>
      <FormControl isInvalid={errors.email} id='email'>
        <FormLabel>{t('profile.email.add.title')}</FormLabel>
        <HStack align='flex-start'>
          <StyledInput
            register={register('email')}
            success={success}
            error={errors.email}
            placeholder={t('profile.email.add.placeholder')}
            errorMessage={errors?.email?.message}
          />
          <IconButton
            aria-label={t('profile.email.add.button')} type='submit' disabled={errors.email}
            isLoading={isAddingEmail}
            size='sm'
            borderRadius='base'
            icon={
              <Icon
                w={3}
                h={3}
                icon={InterfaceArrowsRight}
                fill='gray.100'
              />
            }
          />
        </HStack>
      </FormControl>
    </form>
  )
}
