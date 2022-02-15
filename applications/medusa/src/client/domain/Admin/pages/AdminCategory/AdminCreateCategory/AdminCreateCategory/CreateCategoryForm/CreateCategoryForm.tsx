import { Stack } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { graphql, useMutation } from 'react-relay/hooks'
import { CreateCategoryFormMutation } from '@//:artifacts/CreateCategoryFormMutation.graphql'
import translateValidation from '@//:modules/validation/translateValidation'
import { ConnectionProp } from '@//:types/components'
import { useToast } from '@//:modules/content/ThemeComponents'
import useSlugSubscribe from '../../../../../helpers/useSlugSubscribe'
import GenericTagTitle from '../../../../../validation/GenericTagTitle'
import GenericTagSlug from '../../../../../validation/GenericTagSlug'
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
import { TagSlug, TagTitle } from '@//:types/form'

type Props = ConnectionProp

type CategoryValues = TagTitle & TagSlug

const Mutation = graphql`
  mutation CreateCategoryFormMutation($input: CreateCategoryInput!, $connections: [ID!]!) {
    createCategory(input: $input) {
      category @appendNode(connections: $connections, edgeTypeName: "createCategoryEdge") {
        id
        title
        slug
      }
      validation
    }
  }
`

export default function CreateCategoryForm ({
  connectionId
}: Props): JSX.Element {
  const [createCategory, isCreatingCategory] = useMutation<CreateCategoryFormMutation>(
    Mutation
  )

  const notify = useToast()

  const { i18n } = useLingui()

  const schema = Joi.object({
    title: GenericTagTitle(),
    slug: GenericTagSlug()
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: {
      errors
    }
  } = useForm<CategoryValues>({
    resolver: joiResolver(
      schema
    )
  })

  const onSubmit = (formValues): void => {
    createCategory({
      variables: {
        input: { ...formValues },
        connections: [connectionId]
      },
      onCompleted (data) {
        if (data?.createCategory?.validation != null) {
          setError('slug', {
            type: 'mutation',
            message: i18n._(translateValidation(data.createCategory.validation))
          })
          return
        }
        notify({
          status: 'success',
          title: t`Category ${formValues.title} was created successfully`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`Error creating category ${data.message}`
        })
      }
    })
  }

  useSlugSubscribe({
    watch: watch,
    setValue: setValue,
    from: 'title'
  })

  return (
    <FormBuilder
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
    >
      <Stack spacing={4}>
        <InputBuilder
          id='title'
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
          id='slug'
        >
          <InputBuilderHeader>
            <Trans>
              Category Slug
            </Trans>
          </InputBuilderHeader>
          <InputBuilderBody>
            <TextInput placeholder={i18n._(t`Enter a category slug`)} />
            <InputFeedback />
          </InputBuilderBody>
          <InputBuilderFooter />
        </InputBuilder>
        <FormBuilderSubmitButton
          isLoading={isCreatingCategory}
          w='100%'
          size='lg'
        >
          <Trans>
            Create Category
          </Trans>
        </FormBuilderSubmitButton>
      </Stack>
    </FormBuilder>
  )
}
