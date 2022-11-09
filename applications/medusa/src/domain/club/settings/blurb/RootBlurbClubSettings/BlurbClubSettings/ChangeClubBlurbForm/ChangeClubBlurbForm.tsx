import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { ChangeClubBlurbFormMutation } from '@//:artifacts/ChangeClubBlurbFormMutation.graphql'
import { ChangeClubBlurbFormFragment$key } from '@//:artifacts/ChangeClubBlurbFormFragment.graphql'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputFooter,
  TextareaInput
} from '@//:modules/content/HookedComponents/Form'
import ClubBlurb from '@//:modules/validation/ClubBlurb'

interface Props {
  query: ChangeClubBlurbFormFragment$key
}

interface FormValues {
  blurb: string
}

const Fragment = graphql`
  fragment ChangeClubBlurbFormFragment on Club {
    id @required(action: THROW)
    blurb
  }
`

const Mutation = graphql`
  mutation ChangeClubBlurbFormMutation ($input: UpdateClubBlurbInput!) {
    updateClubBlurb(input: $input) {
      club {
        id
        blurb
      }
    }
  }
`

export default function ChangeClubBlurbForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeClubBlurbFormMutation>(Mutation)

  const schema = Joi.object({
    blurb: ClubBlurb()
  })

  const methods = useForm<FormValues>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {
      blurb: data.blurb
    }
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
          title: t`Successfully updated your club blurb`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating your club blurb`
        })
      }
    }
    )
  }

  return (
    <Form {...methods} onSubmit={onSubmit}>
      <Stack spacing={2}>
        <FormInput
          size='md'
          id='blurb'
        >
          <Stack spacing={4}>
            <Stack spacing={2}>
              <TextareaInput placeholder={i18n._(t`Enter your club blurb here, up to 1000 characters.`)} />
              <InputFooter />
            </Stack>
            <FormSubmitButton
              size='md'
              variant='solid'
              colorScheme='gray'
              isLoading={isInFlight}
            >
              <Trans>
                Submit
              </Trans>
            </FormSubmitButton>
          </Stack>
        </FormInput>
      </Stack>
    </Form>
  )
}
