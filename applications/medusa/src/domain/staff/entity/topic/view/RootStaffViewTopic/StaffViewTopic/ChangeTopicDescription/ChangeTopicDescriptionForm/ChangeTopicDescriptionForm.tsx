import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { TagDescription, TagLocale } from '@//:types/form'
import { ChangeTopicDescriptionFormMutation } from '@//:artifacts/ChangeTopicDescriptionFormMutation.graphql'
import { ChangeTopicDescriptionFormFragment$key } from '@//:artifacts/ChangeTopicDescriptionFormFragment.graphql'
import Locale from '@//:modules/validation/Locale'
import {
  Form,
  FormInput,
  FormSubmitButton,
  InputBody,
  InputFeedback,
  InputFooter,
  InputHeader,
  TextareaInput,
  TextInput
} from '@//:modules/content/HookedComponents/Form'
import GenericTagDescription from '../../../../../../../../../common/validation/GenericTagDescription'

interface Props {
  query: ChangeTopicDescriptionFormFragment$key
}

type TopicValues = TagDescription & TagLocale

const Fragment = graphql`
  fragment ChangeTopicDescriptionFormFragment on Topic {
    id @required(action: THROW)
  }
`

const Mutation = graphql`
  mutation ChangeTopicDescriptionFormMutation ($input: UpdateTopicDescriptionInput!) {
    updateTopicDescription(input: $input) {
      topic {
        id
        description
        descriptionTranslations {
          text
          language {
            locale
            name
          }
        }
      }
    }
  }
`

export default function ChangeTopicDescriptionForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeTopicDescriptionFormMutation>(Mutation)

  const { i18n } = useLingui()

  const schema = Joi.object({
    description: GenericTagDescription(),
    locale: Locale()
  })

  const notify = useToast()

  const methods = useForm<TopicValues>({
    resolver: joiResolver(
      schema
    )
  })

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          id: data.id,
          ...formValues
        }
      },
      onCompleted (data) {
        notify({
          status: 'success',
          title: t`Updated topic description for ${formValues.locale}`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error updating topic description`
        })
      }
    })
  }

  return (
    <Form
      onSubmit={onSubmit}
      {...methods}
    >
      <Stack spacing={4}>
        <Stack spacing={2}>
          <FormInput
            id='description'
            size='sm'
          >
            <InputHeader>
              <Trans>
                Topic Description
              </Trans>
            </InputHeader>
            <InputBody>
              <TextareaInput placeholder={i18n._(t`Enter a description`)} />
              <InputFeedback />
            </InputBody>
            <InputFooter />
          </FormInput>
          <FormInput
            id='locale'
            size='sm'
          >
            <InputHeader>
              <Trans>
                BCP 47 Locale Code
              </Trans>
            </InputHeader>
            <InputBody>
              <TextInput placeholder={i18n._(t`Locale`)} />
              <InputFeedback />
            </InputBody>
            <InputFooter />
          </FormInput>
        </Stack>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='sm'
        >
          <Trans>
            Submit
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
