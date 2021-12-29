import { graphql, useMutation } from 'react-relay/hooks'
import { Alert, AlertDescription, AlertIcon, FormControl, FormLabel, HStack, useToast } from '@chakra-ui/react'
import type { AddEmailFormMutation } from '@//:artifacts/AddEmailFormMutation.graphql'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import StyledInput from '@//:modules/form/StyledInput/StyledInput'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Email from '@//:modules/validation/Email'
import Button from '@//:modules/form/Button/Button'

interface EmailValues {
  email: string
}

interface Props {
  connectionID: string
  isDisabled: boolean
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

export default function AddEmailForm ({
  connectionID,
  isDisabled
}: Props): JSX.Element {
  const schema = Joi.object({
    email: Email()
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
        {isDisabled &&
          <Alert mb={2} status='warning'>
            <AlertIcon />
            <AlertDescription fontSize='sm'>
              <Trans>
                You have added the maximum amount of confirmed emails. You'll have to remove at least one email to be
                able to add another.
              </Trans>
            </AlertDescription>
          </Alert>}
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
            placeholder={t`Enter a new email address`}
            errorMessage={errors?.email?.message}
          />
          <Button
            size='sm'
            variant='solid'
            type='submit'
            colorScheme='gray'
            disabled={(errors.email != null) || isDisabled}
            isLoading={isAddingEmail}
          >
            <Trans>
              Submit
            </Trans>
          </Button>
        </HStack>
      </FormControl>
    </form>
  )
}
