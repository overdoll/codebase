import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useLingui } from '@lingui/react'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { UnSuspendClubFormMutation } from '@//:artifacts/UnSuspendClubFormMutation.graphql'
import { UnSuspendClubFormFragment$key } from '@//:artifacts/UnSuspendClubFormFragment.graphql'
import { useToast } from '@//:modules/content/ThemeComponents'
import { CheckboxInput, Form, FormInput, FormSubmitButton } from '@//:modules/content/HookedComponents/Form'

interface FormValues {
  checkbox: boolean
}

interface Props {
  query: UnSuspendClubFormFragment$key
}

const Fragment = graphql`
  fragment UnSuspendClubFormFragment on Club {
    id
  }
`

const Mutation = graphql`
  mutation UnSuspendClubFormMutation($input: UnSuspendClubInput!) {
    unSuspendClub(input: $input) {
      club {
        id
        suspension {
          expires
        }
      }
    }
  }
`

export default function UnSuspendClubForm ({ query }: Props): JSX.Element | null {
  const data = useFragment(Fragment, query)

  const [commit, IsInFlight] = useMutation<UnSuspendClubFormMutation>(Mutation)

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
          clubId: data.id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Your club has been un-suspended`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error un-suspending your club`
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
            Un-Suspend Club
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
