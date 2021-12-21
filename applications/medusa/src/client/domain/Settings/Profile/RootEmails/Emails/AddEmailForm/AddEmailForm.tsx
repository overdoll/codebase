import { graphql, useMutation } from 'react-relay/hooks'
import { FormControl, FormLabel, HStack, useToast } from '@chakra-ui/react'
import Icon from '@//:modules/content/Icon/Icon'
import type { AddEmailFormMutation } from '@//:artifacts/AddEmailFormMutation.graphql'
import { ArrowButtonRight } from '@//:assets/icons/navigation'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useEmailFormSchema } from '@//:modules/constants/schemas'
import StyledInput from '@//:modules/form/StyledInput/StyledInput'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'

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

  const { i18n } = useLingui()

  const notify = useToast()

  const onAddEmail = (data): void => {
    addEmail({
      variables: {
        input: {
          email: data.email
        },
        connections: [connectionID]
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`A confirmation email was sent to ${data.email}. Check your inbox/spam!`,
          isClosable: true
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error adding the email`,
          isClosable: true
        })
      }
    }
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit(onAddEmail)}>
      <FormControl isInvalid={errors.email != null} id='email'>
        <FormLabel>
          <Trans>
            Add an email
          </Trans>
        </FormLabel>
        <HStack align='flex-start'>
          <StyledInput
            register={register('email')}
            success={success}
            error={errors.email != null}
            placeholder={i18n._(t`Enter an email address`)}
            errorMessage={errors?.email?.message}
          />
          <IconButton
            aria-label={i18n._(t`Add`)}
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
