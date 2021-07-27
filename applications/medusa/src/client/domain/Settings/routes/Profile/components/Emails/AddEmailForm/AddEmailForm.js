/**
 * @flow
 */

import { graphql, useMutation } from 'react-relay/hooks'
import {
  Flex,
  FormControl, FormHelperText,
  Heading, IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement, useToast
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

type EmailValues = {
  email: string,
};

const AddEmailMutationGQL = graphql`
  mutation AddEmailFormMutation($input: AddAccountEmailInput!) {
    addAccountEmail(input: $input) {
      accountEmail {
        email
      }
    }
  }
`

const schema = Joi.object({
  email: Joi
    .string()
    .email({ minDomainSegments: 2, tlds: {} })
    .required()
})

export default function AddEmailForm (): Node {
  const [t] = useTranslation('settings')

  const [addEmail, isAddingEmail] = useMutation<AddEmailFormMutation>(
    AddEmailMutationGQL
  )

  const { register, handleSubmit, formState: { errors, isDirty, isSubmitted } } = useForm<EmailValues>({
    resolver: joiResolver(
      schema
    )
  })

  const success = isDirty && !errors.email && isSubmitted

  const onAddEmail = (formData) => {
    addEmail({
      variables: {
        input: {
          email: formData.email
        }
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

  const notify = useToast()

  return (
    <>
      <form onSubmit={handleSubmit(onAddEmail)}>
        <Heading
          color='gray.00'
          mb={1}
          size='sm'
        >{t('profile.email.add.title')}
        </Heading>
        <Flex direction='row'>
          <FormControl isInvalid={errors.email} id='email'>
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
              {(errors.email || success) && (
                <InputRightElement mr={2} h='32px' pointerEvents='none'>
                  <Icon
                    m={3}
                    icon={success ? InterfaceValidationCheck : InterfaceAlertWarningTriangle}
                    fill={success ? 'green.600' : 'orange.500'}
                  />
                </InputRightElement>
              )}
            </InputGroup>

            {(errors.email || success) && (
              <FormHelperText mt={1} fontSize='sm'>
                {errors.email && t('profile.email.add.form.validation.email.pattern')}
              </FormHelperText>
            )}
          </FormControl>
          <IconButton
            aria-label={t('profile.email.add.button')} type='submit' disabled={errors.email}
            borderRadius={5}
            isLoading={isAddingEmail}
            size='sm' icon={
              <Icon
                m={2}
                icon={InterfaceArrowsRight}
                fill='gray.100'
              />
          }
          />
        </Flex>
      </form>
    </>
  )
}
