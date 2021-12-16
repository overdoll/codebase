import { graphql, useMutation } from 'react-relay/hooks'
import { FormControl, FormLabel, HStack, useToast } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import type { AddEmailFormMutation } from '@//:artifacts/AddEmailFormMutation.graphql'
import { ArrowButtonRight } from '@//:assets/icons/navigation'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useTranslation } from 'react-i18next'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useEmailFormSchema } from '@//:modules/constants/schemas'
import StyledInput from '@//:modules/form/StyledInput/StyledInput'

interface EmailValues {
  email: string
}

interface Props {
  connectionID: string
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

export default function AddEmailForm ({ connectionID }: Props): JSX.Element {
  const [t] = useTranslation('settings')

  const schema = Joi.object({
    email: useEmailFormSchema()
  })

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      isSubmitted
    }
  } = useForm<EmailValues>({
    resolver: joiResolver(
      schema
    )
  })

  const success = isDirty && (errors.email == null) && isSubmitted

  const [addEmail, isAddingEmail] = useMutation<AddEmailFormMutation>(
    AddEmailMutationGQL
  )

  const notify = useToast()

  const onAddEmail = (formData): void => {
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
      <FormControl isInvalid={errors.email != null} id='email'>
        <FormLabel>{t('profile.email.add.title')}</FormLabel>
        <HStack align='flex-start'>
          <StyledInput
            register={register('email')}
            success={success}
            error={errors.email != null}
            placeholder={t('profile.email.add.placeholder')}
            errorMessage={errors?.email?.message}
          />
          <IconButton
            aria-label={t('profile.email.add.button')}
            type='submit'
            disabled={errors.email != null}
            isLoading={isAddingEmail}
            size='sm'
            borderRadius='base'
            icon={
              <Icon
                w={3}
                h={3}
                icon={ArrowButtonRight}
                fill='gray.100'
              />
            }
          />
        </HStack>
      </FormControl>
    </form>
  )
}
