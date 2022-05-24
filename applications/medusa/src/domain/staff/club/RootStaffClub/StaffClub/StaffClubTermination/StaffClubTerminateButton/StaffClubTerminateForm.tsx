import { t, Trans } from '@lingui/macro'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { StaffClubTerminateFormFragment$key } from '@//:artifacts/StaffClubTerminateFormFragment.graphql'
import { StaffClubTerminateFormMutation } from '@//:artifacts/StaffClubTerminateFormMutation.graphql'
import { Stack, Text } from '@chakra-ui/react'
import HighlightInline from '@//:modules/content/ContentHints/HighlightInline/HighlightInline'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useLingui } from '@lingui/react'

interface Props {
  query: StaffClubTerminateFormFragment$key
}

interface FormValues {
  confirmation: string
}

const Fragment = graphql`
  fragment StaffClubTerminateFormFragment on Club {
    id
    name
  }
`

const Mutation = graphql`
  mutation StaffClubTerminateFormMutation($input: TerminateClubInput!) {
    terminateClub(input: $input) {
      club {
        id
        termination {
          account {
            id
            username
          }
        }
      }
    }
  }
`

export default function StaffClubTerminateForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffClubTerminateFormMutation>(Mutation)

  const { i18n } = useLingui()

  const notify = useToast()

  const validString = `terminate ${data.name}`

  const schema = Joi.object({
    confirmation: Joi
      .string()
      .valid(validString)
      .required()
      .messages({
        'any.only': i18n._(t`Please enter the required hint`)
      })
  })

  const methods = useForm<FormValues>({
    resolver: joiResolver(
      schema
    )
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
          title: t`Successfully terminated club`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error terminating the club`
        })
      }
    }
    )
  }

  return (
    <Stack>
      <Text fontSize='md' color='gray.00'>
        <Trans>Please type <HighlightInline colorScheme='orange'>{validString}</HighlightInline> into the
          input below to confirm that you would like to terminate the club.
        </Trans>
      </Text>
      <Form {...methods} onSubmit={onSubmit}>
        <Stack spacing={2}>
          <FormInput size='lg' id='confirmation'>
            <InputBody>
              <TextInput placeholder={validString} />
              <InputFeedback />
            </InputBody>
            <InputFooter />
          </FormInput>
          <FormSubmitButton
            isLoading={isInFlight}
            w='100%'
            size='md'
            colorScheme='orange'
          >
            <Trans>
              Confirm Terminate Club
            </Trans>
          </FormSubmitButton>
        </Stack>
      </Form>
    </Stack>
  )
}
