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
  FormLabel, FormErrorMessage
} from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import type { AddEmailFormMutation } from '@//:artifacts/AddEmailFormMutation.graphql'

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
import { emailSchema } from '@//:modules/constants/schemas/FormSchemas'

type EmailValues = {
  email: string,
};

type Props = {
  connectionID: EmailsSettingsFragment$key,
}

const schema = Joi.object({
  email: emailSchema
})

const AddEmailMutationGQL = graphql`
    mutation AddEmailFormMutation($input: AddAccountEmailInput!, $connections: [ID!]!) {
        addAccountEmail(input: $input) {
            validation
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
      onCompleted (data) {
        if (data.addAccountEmail.validation) {
          setError('email', {
            type: 'mutation',
            message: data.addAccountEmail.validation
          })
          return
        }

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
    <>
      <form noValidate onSubmit={handleSubmit(onAddEmail)}>
        <FormControl isInvalid={errors.email} id='email'>
          <FormLabel>{t('profile.email.add.title')}</FormLabel>
          <Flex direction='row'>
            <InputGroup>
              <InputLeftElement h='32px' pointerEvents='none'>
                <Icon icon={MailSignAt} m={3} fill='gray.200' />
              </InputLeftElement>
              <Input
                {...register('email')}
                w='100%'
                size='sm'
                placeholder={t('profile.email.add.placeholder')}
                variant='outline' mr={2}
              />
              {formReveal && (
                <InputRightElement zIndex={0} mr={2} h='32px' pointerEvents='none'>
                  <Icon
                    m={3}
                    icon={success ? InterfaceValidationCheck : InterfaceAlertWarningTriangle}
                    fill={success ? 'green.600' : 'orange.500'}
                  />
                </InputRightElement>
              )}
            </InputGroup>
            <IconButton
              aria-label={t('profile.email.add.button')} type='submit' disabled={errors.email}
              borderRadius={5}
              isLoading={isAddingEmail}
              size='sm'
              icon={
                <Icon
                  m={2}
                  icon={InterfaceArrowsRight}
                  fill='gray.100'
                />
              }
            />
          </Flex>
          <FormErrorMessage>
            {errors.email && errors.email.type === 'mutation' && errors.email.message}
            {errors.email && errors.email.type === 'string.empty' && t('profile.email.add.form.validation.email.empty')}
            {errors.email && errors.email.type === 'string.email' && t('profile.email.add.form.validation.email.pattern')}
          </FormErrorMessage>
        </FormControl>
      </form>
    </>
  )
}
