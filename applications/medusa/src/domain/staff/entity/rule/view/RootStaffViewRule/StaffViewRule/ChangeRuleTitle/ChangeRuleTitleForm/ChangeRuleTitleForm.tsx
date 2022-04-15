import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import { TagLocale, TagName } from '@//:types/form'
import { ChangeRuleTitleFormMutation } from '@//:artifacts/ChangeRuleTitleFormMutation.graphql'
import { ChangeRuleTitleFormFragment$key } from '@//:artifacts/ChangeRuleTitleFormFragment.graphql'
import Locale from '@//:modules/validation/Locale'
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
import GenericTagTitle from '../../../../../../../../../common/validation/GenericTagTitle'

interface Props {
  query: ChangeRuleTitleFormFragment$key
}

type RuleValues = TagName & TagLocale

const Fragment = graphql`
  fragment ChangeRuleTitleFormFragment on Rule {
    id @required(action: THROW)
  }
`

const Mutation = graphql`
  mutation ChangeRuleTitleFormMutation ($input: UpdateRuleTitleInput!) {
    updateRuleTitle(input: $input) {
      rule {
        id
        title
        titleTranslations {
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

export default function ChangeRuleTitleForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeRuleTitleFormMutation>(Mutation)

  const { i18n } = useLingui()

  const schema = Joi.object({
    title: GenericTagTitle(),
    locale: Locale()
  })

  const notify = useToast()

  const methods = useForm<RuleValues>({
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
          title: t`Updated rule title to ${formValues.title} for ${formValues.locale}`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error updating rule title`
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
            id='title'
            size='sm'
          >
            <InputHeader>
              <Trans>
                Rule Title
              </Trans>
            </InputHeader>
            <InputBody>
              <TextInput placeholder={i18n._(t`Enter a title`)} />
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
