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
} from '@//:modules/form/InputBuilder'
import FormBuilder from '@//:modules/form/FormBuilder/FormBuilder'
import FormBuilderSubmitButton from '@//:modules/form/FormBuilder/FormBuilderSubmitButton/FormBuilderSubmitButton'
import { TagLocale, TagTitle } from '@//:types/form'
import { ChangeCategoryTitleFormMutation } from '@//:artifacts/ChangeCategoryTitleFormMutation.graphql'
import { ChangeCategoryTitleFormFragment$key } from '@//:artifacts/ChangeCategoryTitleFormFragment.graphql'
import GenericTagTitle from '../../../../../../validation/GenericTagTitle'
import Locale from '@//:modules/validation/Locale'

interface Props {
  query: ChangeCategoryTitleFormFragment$key
}

type CategoryValues = TagTitle & TagLocale

const Fragment = graphql`
  fragment ChangeCategoryTitleFormFragment on Category {
    id @required(action: THROW)
  }
`

const Mutation = graphql`
  mutation ChangeCategoryTitleFormMutation ($input: UpdateCategoryTitleInput!) {
    updateCategoryTitle(input: $input) {
      category {
        id
        title
      }
    }
  }
`

export default function ChangeCategoryTitleForm ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<ChangeCategoryTitleFormMutation>(Mutation)

  const { i18n } = useLingui()

  const schema = Joi.object({
    title: GenericTagTitle(),
    locale: Locale()
  })

  const notify = useToast()

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<CategoryValues>({
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
          title: t`Updated category title to ${formValues.title} for ${formValues.locale}`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error updating category title`
        })
      }
    })
  }

  return (
    <FormBuilder
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
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
              <TextInput placeholder={i18n._(t`Enter a category title`)} />
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
