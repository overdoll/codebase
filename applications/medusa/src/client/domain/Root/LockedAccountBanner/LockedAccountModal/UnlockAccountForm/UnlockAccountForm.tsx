import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useLingui } from '@lingui/react'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { UnlockAccountFormMutation } from '@//:artifacts/UnlockAccountFormMutation.graphql'
import { UnlockAccountFormFragment$key } from '@//:artifacts/UnlockAccountFormFragment.graphql'
import { useToast } from '@//:modules/content/ThemeComponents'
import { CheckboxInput, Form, FormInput, FormSubmitButton } from '@//:modules/content/HookedComponents/Form'

interface FormValues {
  checkbox: boolean
}

interface Props {
  queryRef: UnlockAccountFormFragment$key
}

const UnlockAccountFormGQL = graphql`
  fragment UnlockAccountFormFragment on Account {
    id
  }
`

const Mutation = graphql`
  mutation UnlockAccountFormMutation($input: UnlockAccountInput!) {
    unlockAccount(input: $input) {
      account {
        id
        lock {
          expires
        }
        isModerator
        isStaff
      }
    }
  }
`

export default function UnlockAccountForm ({ queryRef }: Props): JSX.Element | null {
  const [commit, IsInFlight] = useMutation<UnlockAccountFormMutation>(Mutation)

  const data = useFragment(UnlockAccountFormGQL, queryRef)

  const { i18n } = useLingui()

  const schema = Joi.object({
    checkbox: Joi
      .boolean()
      .required()
      .valid(true)
      .messages({
        'any.only': i18n._(t`You must agree to follow the community guidelines`)
      })
  })

  const methods = useForm<FormValues>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {
      checkbox: false
    }
  })

  const onSubmit = (): void => {
    commit({
      variables: {
        input: {
          accountID: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Your account has been unlocked`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error unlocking your account`
        })
      }
    })
  }

  const notify = useToast()

  return (
    <Form {...methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <FormInput
          size='sm'
          id='checkbox'
        >
          <CheckboxInput>
            <Trans>
              I promise to be better and to follow the community guidelines more closely
            </Trans>
          </CheckboxInput>
        </FormInput>
        <FormSubmitButton
          isLoading={IsInFlight}
          colorScheme='green'
          size='lg'
        >
          <Trans>
            Unlock Account
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
