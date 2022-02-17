import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { AddClubSlugAliasFragment$key } from '@//:artifacts/AddClubSlugAliasFragment.graphql'
import { AddClubSlugAliasMutation } from '@//:artifacts/AddClubSlugAliasMutation.graphql'
import { HStack, InputLeftAddon } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useLingui } from '@lingui/react'
import ClubSlug from '@//:modules/validation/ClubSlug'
import translateValidation from '@//:modules/validation/translateValidation'
import { useToast } from '@//:modules/content/ThemeComponents'
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

interface Props {
  query: AddClubSlugAliasFragment$key
  isDisabled: boolean
}

interface ClubSlugValues {
  slug: string
}

const Fragment = graphql`
  fragment AddClubSlugAliasFragment on Club {
    id
    slug
  }
`

const Mutation = graphql`
  mutation AddClubSlugAliasMutation ($input: AddClubSlugAliasInput!) {
    addClubSlugAlias(input: $input) {
      club {
        id
        slug
        slugAliases {
          __id
          slug
        }
      }
      validation
    }
  }
`

export default function AddClubSlugAlias ({ query, isDisabled }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isInFlight] = useMutation<AddClubSlugAliasMutation>(Mutation)

  const schema = Joi.object({
    slug: ClubSlug()
  })

  const methods = useForm<ClubSlugValues>({
    resolver: joiResolver(
      schema
    )
  })

  const { setError } = methods

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
      onCompleted (data) {
        if (data?.addClubSlugAlias?.validation != null) {
          setError('slug', {
            type: 'mutation',
            message: i18n._(translateValidation(data.addClubSlugAlias?.validation))
          })
          return
        }
        notify({
          status: 'success',
          title: t`Successfully added the link alias ${formData.slug}`
        })
      },

      onError () {
        notify({
          status: 'error',
          title: t`There was an error adding a link alias`
        })
      }
    }
    )
  }

  return (
    <Form {...methods} onSubmit={onSubmit}>

      <FormInput
        size='sm'
        id='slug'
      >
        <InputHeader>
          <Trans>
            Enter a new club link
          </Trans>
        </InputHeader>
        <HStack spacing={2}>
          <InputBody>
            <InputLeftAddon>
              <Trans>
                overdoll.com/
              </Trans>
            </InputLeftAddon>
            <TextInput placeholder={i18n._(t`Enter a new club link`)} />
            <InputFeedback />
          </InputBody>
          <FormSubmitButton isDisabled={isDisabled} size='sm' isLoading={isInFlight}>
            <Trans>
              Submit
            </Trans>
          </FormSubmitButton>
        </HStack>
        <InputFooter />
      </FormInput>
    </Form>
  )
}
