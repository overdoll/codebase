import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFooter,
  InputHeader,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import Joi from 'joi'
import Email from '@//:modules/validation/Email'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useLingui } from '@lingui/react'
import { useToast } from '@//:modules/content/ThemeComponents'
import { graphql, useMutation } from 'react-relay/hooks'
import { SetPaxumAccountPayoutMethodFormMutation } from '@//:artifacts/SetPaxumAccountPayoutMethodFormMutation.graphql'

interface EmailValues {
  email: string
}

const Mutation = graphql`
  mutation SetPaxumAccountPayoutMethodFormMutation($input: SetPaxumAccountPayoutMethodInput!) {
    setPaxumAccountPayoutMethod(input: $input) {
      accountPayoutMethod {
        __typename
        ...PayoutMethodFragment
        ...PayoutMethodDeleteFragment
        ...on AccountPaxumPayoutMethod {
          id
          email
        }
      }
    }
  }
`

export default function SetPaxumAccountPayoutMethodForm (): JSX.Element {
  const [commit, isLoading] = useMutation<SetPaxumAccountPayoutMethodFormMutation>(Mutation)

  const schema = Joi.object({
    email: Email()
  })

  const methods = useForm<EmailValues>({
    resolver: joiResolver(
      schema
    )
  })

  const { i18n } = useLingui()

  const notify = useToast()

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          ...formValues
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Payout method Paxum successfully set up`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error setting up the payout method`
        })
      },
      updater: (store) => {
        const viewer = store.getRoot().getLinkedRecord('viewer')
        if (viewer != null) {
          const payload = store?.getRootField('setPaxumAccountPayoutMethod')?.getLinkedRecord('accountPayoutMethod')
          if (payload != null) {
            viewer?.setLinkedRecord(payload, 'payoutMethod')
          }
        }
      }
    }
    )
  }

  return (
    <Form {...methods} onSubmit={onSubmit}>
      <Stack spacing={2}>
        <FormInput
          size='md'
          id='email'
        >
          <InputHeader>
            <Trans>
              Paxum Email
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={i18n._(t`Enter your Paxum payments email`)} />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          size='md'
          variant='solid'
          isLoading={isLoading}
          colorScheme='green'
          w='100%'
        >
          <Trans>
            Set up payout method
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
