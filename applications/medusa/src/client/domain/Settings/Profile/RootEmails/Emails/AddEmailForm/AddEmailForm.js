/**
 * @flow
 */

import { graphql, useMutation } from 'react-relay/hooks'
import { FormControl, FormLabel, HStack, useToast } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import type { AddEmailFormMutation } from '@//:artifacts/AddEmailFormMutation.graphql'
import { ArrowButtonRight } from '../../../../../../../assets/icons/navigation'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import type { EmailsSettingsFragment$key } from '@//:artifacts/EmailsSettingsFragment.graphql'
import IconButton from '@//:modules/form/IconButton'
import { useEmailFormSchema } from '@//:modules/constants/schemas'
import StyledInput from '@//:modules/form/StyledInput/StyledInput'
import Button from '@//:modules/form/Button'

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
          <Button
            size='sm'
            variant='solid'
            type='submit'
            colorScheme='gray'
            disabled={errors.email}
            isLoading={isAddingEmail}
          >
            {t('profile.email.add.button')}
          </Button>
        </HStack>
      </FormControl>
    </form>
  )
}
