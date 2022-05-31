import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import { ExternalLink } from '@//:modules/routing'
import { PaxumLogo } from '@//:assets/logos'
import { Icon } from '@//:modules/content/PageLayout'
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
import { SetupPaxumAccountPayoutMethodMutation } from '@//:artifacts/SetupPaxumAccountPayoutMethodMutation.graphql'
import LinkInline from '@//:modules/content/ContentHints/LinkInline/LinkInline'

interface EmailValues {
  email: string
}

const Mutation = graphql`
  mutation SetupPaxumAccountPayoutMethodMutation($input: SetPaxumAccountPayoutMethodInput!) {
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

export default function SetupPaxumAccountPayoutMethod (): JSX.Element {
  const [commit, isLoading] = useMutation<SetupPaxumAccountPayoutMethodMutation>(Mutation)

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
    <Stack spacing={8}>
      <HStack align='center' justify='space-between'>
        <Heading color='gray.00' fontSize='xl'>
          <Trans>
            Paxum
          </Trans>
        </Heading>
        <Icon icon={PaxumLogo} h={4} />
      </HStack>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Heading color='gray.00' fontSize='xl'>
            <Trans>
              Create an account and get verified
            </Trans>
          </Heading>
          <Text color='gray.100' fontSize='sm'>
            <Trans>
              To set up Paxum as a payout method, you must create an account and have it verified by providing the
              necessary
              documentation through a Know Your Client procedure. If you already have an account, you may skip this
              step.
            </Trans>
          </Text>
        </Stack>
        <ExternalLink href='https://portal.paxum.com/register'>
          <Button w='100%' size='md' colorScheme='gray'>
            <Trans>
              Open Paxum Sign Up Link
            </Trans>
          </Button>
        </ExternalLink>
      </Stack>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Heading color='gray.00' fontSize='xl'>
            <Trans>
              Enter your Paxum payments email
            </Trans>
          </Heading>
          <Text color='gray.100' fontSize='sm'>
            <Trans>
              Once your account is verified, please enter your Paxum email for receiving payments. Entering an
              unverified
              or invalid account email will result in failed payouts and a frozen balance.
            </Trans>
          </Text>
          <Text color='gray.100' fontSize='sm'>
            <Trans>
              Please note that while there are no fees for receiving payments, you are subject to fees when withdrawing
              via local bank account or wire. Please refer to the{' '}
              <LinkInline
                href='https://www.paxum.com/fees/personal'
              >
                site's Fees page
              </LinkInline> for more information.
            </Trans>
          </Text>
        </Stack>
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
      </Stack>
    </Stack>
  )
}
