import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { AddClubSlugAliasFragment$key } from '@//:artifacts/AddClubSlugAliasFragment.graphql'
import { AddClubSlugAliasMutation } from '@//:artifacts/AddClubSlugAliasMutation.graphql'
import { FormControl, FormLabel, HStack, InputLeftAddon } from '@chakra-ui/react'
import { t, Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import StyledInput from '@//:modules/content/ThemeComponents/StyledInput/StyledInput'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useLingui } from '@lingui/react'
import ClubSlug from '@//:modules/validation/ClubSlug'
import translateValidation from '@//:modules/validation/translateValidation'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'
import { useToast } from '@//:modules/content/ThemeComponents'

interface Props {
  query: AddClubSlugAliasFragment$key | null
}

interface ClubSlugValues {
  slug: string
}

const Fragment = graphql`
  fragment AddClubSlugAliasFragment on Club {
    id
    slug
    slugAliases {
      __typename
    }
    slugAliasesLimit
  }
`

const Mutation = graphql`
  mutation AddClubSlugAliasMutation ($id: ID!, $slug: String!) {
    addClubSlugAlias(input: {id: $id, slug: $slug}) {
      club {
        id
        slug
        slugAliases {
          slug
        }
      }
      validation
    }
  }
`

export default function AddClubSlugAlias ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [addSlug, isAddingSlug] = useMutation<AddClubSlugAliasMutation>(Mutation)

  const schema = Joi.object({
    slug: ClubSlug()
  })

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isDirty,
      isSubmitted
    }
  } = useForm<ClubSlugValues>({
    resolver: joiResolver(
      schema
    )
  })

  const { i18n } = useLingui()

  const notify = useToast()

  const success = isDirty && (errors.slug == null) && isSubmitted

  const disableSlugAdd = data?.slugAliases.length === data?.slugAliasesLimit

  const onAddSlug = (formData): void => {
    if (data?.id == null) return
    addSlug({
      variables: {
        id: data.id,
        slug: formData.slug
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
    <>
      {disableSlugAdd && (
        <Alert mb={2} status='warning'>
          <AlertIcon />
          <AlertDescription fontSize='sm'>
            <Trans>
              You have added the maximum amount of aliases. You'll have to remove at least one alias to be
              able to add another.
            </Trans>
          </AlertDescription>
        </Alert>)}
      <form noValidate onSubmit={handleSubmit(onAddSlug)}>
        <FormControl isInvalid={errors.slug != null} id='email'>
          <FormLabel fontSize='sm'>
            <Trans>
              Enter a new club link
            </Trans>
          </FormLabel>
          <HStack align='flex-start'>
            <StyledInput
              inputLeftAddon={
                <InputLeftAddon>
                  <Trans>
                    overdoll.com/
                  </Trans>
                </InputLeftAddon>
              }
              size='sm'
              register={register('slug')}
              success={success}
              error={errors.slug != null}
              placeholder={i18n._(t`Enter a new club link`)}
              errorMessage={errors?.slug?.message}
            />
            <Button
              size='sm'
              variant='solid'
              type='submit'
              colorScheme='gray'
              isDisabled={(errors.slug != null) || disableSlugAdd}
              isLoading={isAddingSlug}
            >
              <Trans>
                Submit
              </Trans>
            </Button>
          </HStack>
        </FormControl>
      </form>
    </>
  )
}
