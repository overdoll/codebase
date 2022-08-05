import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  StaffEnableClubCharactersButtonFragment$key
} from '@//:artifacts/StaffEnableClubCharactersButtonFragment.graphql'
import { StaffEnableClubCharactersButtonMutation } from '@//:artifacts/StaffEnableClubCharactersButtonMutation.graphql'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi/dist/joi'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import { useLingui } from '@lingui/react'
import { Stack } from '@chakra-ui/react'

interface Props {
  query: StaffEnableClubCharactersButtonFragment$key
}

interface FormValues {
  charactersLimit: number
}

const Fragment = graphql`
  fragment StaffEnableClubCharactersButtonFragment on Club {
    id
    charactersLimit
  }
`

const Mutation = graphql`
  mutation StaffEnableClubCharactersButtonMutation($input: EnableClubCharactersInput!) {
    enableClubCharacters(input: $input) {
      club {
        id
        charactersEnabled
        charactersLimit
      }
    }
  }
`

export default function StaffEnableClubCharactersButton ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffEnableClubCharactersButtonMutation>(Mutation)

  const notify = useToast()

  const { i18n } = useLingui()

  const schema = Joi.object({
    charactersLimit: Joi.number()
      .min(1)
      .max(200)
      .required()
  })

  const methods = useForm<FormValues>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {
      charactersLimit: data.charactersLimit !== 0 ? data.charactersLimit : 5
    }
  })

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          clubId: data.id,
          ...formValues
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully enabled characters for this club`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error enabling characters for this club`
        })
      }
    }
    )
  }

  return (
    <Form {...methods} onSubmit={onSubmit}>
      <Stack spacing={2}>
        <FormInput size='md' id='charactersLimit'>
          <InputBody>
            <TextInput placeholder={i18n._(t`Number of characters`)} />
            <InputFeedback />
          </InputBody>
        </FormInput>
        <FormSubmitButton
          size='md'
          isLoading={isInFlight}
          onClick={onSubmit}
          w='100%'
          colorScheme='green'
        >
          <Trans>
            Enable Club Characters
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
