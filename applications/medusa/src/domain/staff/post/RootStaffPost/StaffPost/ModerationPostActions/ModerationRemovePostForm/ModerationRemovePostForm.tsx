import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { StaffLockAccountFormMutation } from '@//:artifacts/StaffLockAccountFormMutation.graphql'
import { ModerationRemovePostFormFragment$key } from '@//:artifacts/ModerationRemovePostFormFragment.graphql'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputFooter,
  InputHeader,
  RuleInput,
  TextareaInput
} from '@//:modules/content/HookedComponents/Form'
import GenericTagId from '../../../../../../../common/validation/GenericTagId'
import ModerationNote from '@//:modules/validation/ModerationNote'
import { useLingui } from '@lingui/react'

interface Props {
  query: ModerationRemovePostFormFragment$key
}

interface PostValues {
  postId: string
  notes: string
  ruleId: string
}

const Fragment = graphql`
  fragment ModerationRemovePostFormFragment on Post {
    id
  }
`

const Mutation = graphql`
  mutation ModerationRemovePostFormMutation($input: RemovePostInput!) {
    removePost(input: $input) {
      post {
        id
        state
      }
    }
  }
`

export default function ModerationRemovePostForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<StaffLockAccountFormMutation>(Mutation)

  const { i18n } = useLingui()

  const schema = Joi.object({
    notes: ModerationNote(),
    ruleId: GenericTagId()
  })

  const notify = useToast()

  const methods = useForm<PostValues>({
    resolver: joiResolver(
      schema
    )
  })

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          postId: data.id,
          ...formValues
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully removed post`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error removing the post`
        })
      }
    }
    )
  }

  return (
    <Form
      onSubmit={onSubmit}
      {...methods}
    >
      <Stack spacing={2}>
        <FormInput
          id='ruleId'
          size='md'
        >
          <InputHeader>
            <Trans>
              Rule
            </Trans>
          </InputHeader>
          <RuleInput />
          <InputFooter />
        </FormInput>
        <FormInput
          size='md'
          id='notes'
        >
          <InputHeader>
            <Trans>
              Note
            </Trans>
          </InputHeader>
          <TextareaInput placeholder={i18n._(t`Add a note describing the reason in detail...`)} />
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='md'
          colorScheme='orange'
        >
          <Trans>
            Confirm Remove Post
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
