import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { useToast } from '@//:modules/content/ThemeComponents'
import {
  InputBuilder,
  InputBuilderBody,
  InputBuilderFooter,
  InputBuilderHeader,
  InputFeedback,
  TextInput
} from '@//:modules/form/FormBuilder/InputBuilder'
import { TagLocale, TagTitle } from '@//:types/form'
import { ChangeSeriesTitleFormMutation } from '@//:artifacts/ChangeSeriesTitleFormMutation.graphql'
import { ChangeSeriesTitleFormFragment$key } from '@//:artifacts/ChangeSeriesTitleFormFragment.graphql'
import GenericTagTitle from '../../../../../../validation/GenericTagTitle'
import Locale from '@//:modules/validation/Locale'
import { FormBuilder, FormBuilderSubmitButton } from '@//:modules/form/FormBuilder/FormBuilder'

interface Props {
  query: ChangeSeriesTitleFormFragment$key
}

type SeriesValues = TagTitle & TagLocale

const Fragment = graphql`
  fragment ChangeSeriesTitleFormFragment on Series {
    id @required(action: THROW)
  }
`

const Mutation = graphql`
  mutation ChangeSeriesTitleFormMutation ($input: UpdateSeriesTitleInput!) {
    updateSeriesTitle(input: $input) {
      series {
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

export default function ChangeSeriesTitleForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeSeriesTitleFormMutation>(Mutation)

  const { i18n } = useLingui()

  const schema = Joi.object({
    title: GenericTagTitle(),
    locale: Locale()
  })

  const notify = useToast()

  const methods = useForm<SeriesValues>({
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
          title: t`Updated series title to ${formValues.title} for ${formValues.locale}`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error updating series title`
        })
      }
    })
  }

  return (
    <FormBuilder
      onSubmit={onSubmit}
      {...methods}
    >
      <Stack spacing={4}>
        <Stack spacing={2}>
          <InputBuilder
            id='title'
            size='sm'
          >
            <InputBuilderHeader>
              <Trans>
                Category Title
              </Trans>
            </InputBuilderHeader>
            <InputBuilderBody>
              <TextInput placeholder={i18n._(t`Enter a series title`)} />
              <InputFeedback />
            </InputBuilderBody>
            <InputBuilderFooter />
          </InputBuilder>
          <InputBuilder
            id='locale'
            size='sm'
          >
            <InputBuilderHeader>
              <Trans>
                BCP 47 Locale Code
              </Trans>
            </InputBuilderHeader>
            <InputBuilderBody>
              <TextInput placeholder={i18n._(t`Locale`)} />
              <InputFeedback />
            </InputBuilderBody>
            <InputBuilderFooter />
          </InputBuilder>
        </Stack>
        <FormBuilderSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='sm'
        >
          <Trans>
            Submit
          </Trans>
        </FormBuilderSubmitButton>
      </Stack>
    </FormBuilder>
  )
}
