import { HStack, Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { ChangeClubNameFormMutation } from '@//:artifacts/ChangeClubNameFormMutation.graphql'
import { ChangeClubNameFormFragment$key } from '@//:artifacts/ChangeClubNameFormFragment.graphql'
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
import ClubName from '@//:modules/validation/ClubName'

interface Props {
  query: ChangeClubNameFormFragment$key
}

interface ClubNameValues {
  name: string
}

const Fragment = graphql`
  fragment ChangeClubNameFormFragment on Club {
    id @required(action: THROW)
  }
`

const Mutation = graphql`
  mutation ChangeClubNameFormMutation ($input: UpdateClubNameInput!) {
    updateClubName(input: $input) {
      club {
        id
        name
      }
    }
  }
`

export default function ChangeClubNameForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeClubNameFormMutation>(Mutation)

  const schema = Joi.object({
    name: ClubName()
  })

  const methods = useForm<ClubNameValues>({
    resolver: joiResolver(
      schema
    )
  })

  const { i18n } = useLingui()

  const notify = useToast()

  const onSubmit = (formData): void => {
    commit({
      variables: {
        input: {
          id: data.id,
          ...formData
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully updated your club name to ${formData.name}`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating your club name`
        })
      }
    }
    )
  }

  return (
    <Form {...methods} onSubmit={onSubmit}>
      <Stack spacing={2}>
        <FormInput
          size='sm'
          id='name'
        >
          <InputHeader>
            <Trans>
              Enter a new club name
            </Trans>
          </InputHeader>
          <HStack align='flex-start'>
            <InputBody>
              <TextInput placeholder={i18n._(t`Enter a new club name`)} />
              <InputFeedback />
            </InputBody>
            <FormSubmitButton
              size='sm'
              variant='solid'
              colorScheme='gray'
              isLoading={isInFlight}
            >
              <Trans>
                Submit
              </Trans>
            </FormSubmitButton>
          </HStack>
          <InputFooter />
        </FormInput>
      </Stack>
    </Form>
  )
}
