import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { UpdateAccountDetailsFragment$key } from '@//:artifacts/UpdateAccountDetailsFragment.graphql'
import type { UpdateAccountDetailsMutation } from '@//:artifacts/UpdateAccountDetailsMutation.graphql'
import { Stack } from '@chakra-ui/react'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  InputHeader,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi/dist/joi'
import { useLingui } from '@lingui/react'
import GenericTagId from '../../../../../../../common/validation/GenericTagId'
import FirstName from '@//:modules/validation/FirstName'
import LastName from '@//:modules/validation/LastName'
import { useToast } from '@//:modules/content/ThemeComponents'
import CountryInput from '@//:modules/content/HookedComponents/Form/FormInput/Inputs/CountryInput/CountryInput'

interface Props {
  query: UpdateAccountDetailsFragment$key
}

interface AccountDetails {
  countryId: string
  firstName: string
  lastName: string
}

const Fragment = graphql`
  fragment UpdateAccountDetailsFragment on Account {
    details {
      id
      firstName
      lastName
      country {
        id
      }
    }
  }
`

const Mutation = graphql`
  mutation UpdateAccountDetailsMutation($input: UpdateAccountDetailsInput!) {
    updateAccountDetails(input: $input) {
      accountDetails {
        id
        firstName
        lastName
        country {
          id
          name
          emoji
          alpha3
          payoutMethods
        }
      }
    }
  }
`

export default function UpdateAccountDetails ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<UpdateAccountDetailsMutation>(Mutation)

  const schema = Joi.object({
    countryId: GenericTagId(),
    firstName: FirstName(),
    lastName: LastName()
  })

  const methods = useForm<AccountDetails>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {
      countryId: data?.details?.country?.id,
      firstName: data?.details?.firstName,
      lastName: data?.details?.lastName
    }
  })

  const { i18n } = useLingui()

  const onSubmit = (formData): void => {
    commit({
      variables: {
        input: {
          ...formData
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully updated account details`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating your account details`
        })
      },
      updater: (store) => {
        const viewer = store.getRoot().getLinkedRecord('viewer')
        if (viewer != null) {
          const payload = store.getRootField('updateAccountDetails').getLinkedRecord('accountDetails')
          viewer.getOrCreateLinkedRecord('details', 'AccountDetails').copyFieldsFrom(payload)
        }
      }
    })
  }

  const notify = useToast()

  return (
    <Form onSubmit={onSubmit} {...methods}>
      <Stack spacing={6}>
        <FormInput
          id='firstName'
          size='lg'
        >
          <InputHeader>
            <Trans>
              First Name
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={
              i18n._(t`Enter a first name`)
            }
            />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormInput
          id='lastName'
          size='lg'
        >
          <InputHeader>
            <Trans>
              Last Name
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={
              i18n._(t`Enter a last name`)
            }
            />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormInput
          id='countryId'
          size='lg'
        >
          <InputHeader>
            <Trans>
              Country
            </Trans>
          </InputHeader>
          <InputBody>
            <CountryInput variant='solid' />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          size='lg'
          variant='solid'
          isLoading={isInFlight}
          colorScheme='purple'
          w='100%'
        >
          <Trans>
            Update Account Details
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
