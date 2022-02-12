import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { ChangeClubNameFragment$key } from '@//:artifacts/ChangeClubNameFragment.graphql'
import { ChangeClubNameMutation } from '@//:artifacts/ChangeClubNameMutation.graphql'
import { Collapse, FormControl, FormLabel, HStack, Text, useDisclosure } from '@chakra-ui/react'
import { ListSpacer, PageSectionTitle, PageSectionWrap, SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { t, Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import StyledInput from '@//:modules/content/ThemeComponents/StyledInput/StyledInput'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useLingui } from '@lingui/react'
import ClubName from '@//:modules/validation/ClubName'
import { useToast } from '@//:modules/content/ThemeComponents'

interface Props {
  query: ChangeClubNameFragment$key | null
}

interface ClubNameValues {
  name: string
}

const Fragment = graphql`
  fragment ChangeClubNameFragment on Club {
    id
    name
  }
`

const Mutation = graphql`
  mutation ChangeClubNameMutation ($id: ID!, $name: String!) {
    updateClubName(input: {id: $id, name: $name}) {
      club {
        id
        name
      }
    }
  }
`

export default function ChangeClubName ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [changeName, isChangingName] = useMutation<ChangeClubNameMutation>(Mutation)

  const {
    isOpen,
    onToggle
  } = useDisclosure()

  const schema = Joi.object({
    name: ClubName()
  })

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isDirty,
      isSubmitted
    }
  } = useForm<ClubNameValues>({
    resolver: joiResolver(
      schema
    )
  })

  const { i18n } = useLingui()

  const notify = useToast()

  const success = isDirty && (errors.name == null) && isSubmitted

  const onChangeName = (formData): void => {
    if (data?.id == null) return

    changeName({
      variables: {
        id: data.id,
        name: formData.name
      },
      onCompleted (data) {
        notify({
          status: 'success',
          title: t`Successfully updated your club name to ${formData.name}`
        })
      },
      onError (data) {
        notify({
          status: 'error',
          title: t`There was an error updating your club name`
        })
      }
    }
    )
  }

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Club Name
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <ListSpacer>
        <SmallBackgroundBox>
          <Text fontFamily='mono' fontSize='2xl' color='gray.00'>{data?.name}</Text>
        </SmallBackgroundBox>
        <Button
          variant='solid'
          colorScheme='gray'
          onClick={onToggle}
          size='sm'
        >
          <Trans>
            Change Club Name
          </Trans>
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <form noValidate onSubmit={handleSubmit(onChangeName)}>
            <FormControl isInvalid={errors.name != null} id='email'>
              <FormLabel fontSize='sm'>
                <Trans>
                  Enter a new club name
                </Trans>
              </FormLabel>
              <HStack align='flex-start'>
                <StyledInput
                  size='sm'
                  register={register('name')}
                  success={success}
                  error={errors.name != null}
                  placeholder={i18n._(t`Enter a new club name`)}
                  errorMessage={errors?.name?.message}
                />
                <Button
                  size='sm'
                  variant='solid'
                  type='submit'
                  colorScheme='gray'
                  isDisabled={(errors.name != null)}
                  isLoading={isChangingName}
                >
                  <Trans>
                    Submit
                  </Trans>
                </Button>
              </HStack>
            </FormControl>
          </form>
        </Collapse>
      </ListSpacer>
    </>
  )
}
