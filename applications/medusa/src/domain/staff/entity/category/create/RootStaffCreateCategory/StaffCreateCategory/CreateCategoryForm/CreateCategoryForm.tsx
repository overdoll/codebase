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
import GenericTagTitle from '../../../../../../../../common/validation/GenericTagTitle'
import GenericTagSlug from '../../../../../../../../common/validation/GenericTagSlug'
import { TagSlug, TagTitle } from '@//:types/form'
import useSlugSubscribe from '../../../../../../../../common/support/useSlugSubscribe'
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
  const [commit, isInFlight] = useMutation<CreateCategoryFormMutation>(
    Mutation
  )

  const notify = useToast()

  const { i18n } = useLingui()

  const schema = Joi.object({
    title: GenericTagTitle(),
    slug: GenericTagSlug()
  })

  const methods = useForm<CategoryValues>({
    resolver: joiResolver(
      schema
    )
  })

  const {
    setError
  } = methods

  const onSubmit = (formValues): void => {
    commit({
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
          title: t`Category "${formValues.title}" was created successfully`
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
    from: 'title',
    ...methods
  })

  return (
    <Form
      onSubmit={onSubmit}
      {...methods}
    >
      <Stack spacing={4}>
        <FormInput
          id='title'
        >
          <InputHeader>
            <Trans>
              Category Title
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={i18n._(t`Enter a category title`)} />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormInput
          id='slug'
        >
          <InputHeader>
            <Trans>
              Category Slug
            </Trans>
          </InputHeader>
          <InputBody>
            <TextInput placeholder={i18n._(t`Enter a category slug`)} />
            <InputFeedback />
          </InputBody>
          <InputFooter />
        </FormInput>
        <FormSubmitButton
          isLoading={isInFlight}
          w='100%'
          size='lg'
        >
          <Trans>
            Create Category
          </Trans>
        </FormSubmitButton>
      </Stack>
    </Form>
  )
}
