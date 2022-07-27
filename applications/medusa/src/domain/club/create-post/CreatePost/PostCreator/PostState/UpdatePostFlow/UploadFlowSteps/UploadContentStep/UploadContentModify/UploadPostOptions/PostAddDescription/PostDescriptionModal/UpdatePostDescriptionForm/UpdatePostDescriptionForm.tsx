import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import type { UpdatePostDescriptionFormFragment$key } from '@//:artifacts/UpdatePostDescriptionFormFragment.graphql'
import { CircularProgress, Flex, HStack, Stack } from '@chakra-ui/react'
import {
  Form,
  FormInput,
  FormSubmitIconButton,
  InputBody,
  InputFooter,
  TextareaInput
} from '@//:modules/content/HookedComponents/Form'
import { t } from '@lingui/macro'
import Joi from 'joi'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi/dist/joi'
import { useToast } from '@//:modules/content/ThemeComponents'
import { UpdatePostDescriptionFormMutation } from '@//:artifacts/UpdatePostDescriptionFormMutation.graphql'
import { useLingui } from '@lingui/react'
import { CheckMark, DeleteBin } from '@//:assets/icons'
import { Icon } from '@//:modules/content/PageLayout'
import { useEffect, useState } from 'react'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { DETECT_LINKS } from '@//:modules/constants/regex'

interface Props {
  query: UpdatePostDescriptionFormFragment$key
  onClose: () => void
  inputRef: any
}

interface FormProps {
  description: string
}

const Fragment = graphql`
  fragment UpdatePostDescriptionFormFragment on Post {
    id
    description
  }
`

const Mutation = graphql`
  mutation UpdatePostDescriptionFormMutation($input: UpdatePostDescriptionInput!) {
    updatePostDescription(input: $input) {
      post {
        id
        description
      }
    }
  }
`

const MAXIMUM_CHARACTER_COUNT = 280

export default function UpdatePostDescriptionForm ({
  query,
  onClose,
  inputRef
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, IsInFlight] = useMutation<UpdatePostDescriptionFormMutation>(Mutation)

  const { i18n } = useLingui()

  const notify = useToast()

  const schema = Joi.object({
    description: Joi
      .string()
      .regex(DETECT_LINKS, { invert: true })
      .min(0)
      .max(MAXIMUM_CHARACTER_COUNT)
      .messages({
        'string.max': i18n._(t`The description length cannot exceed ${MAXIMUM_CHARACTER_COUNT} characters`),
        'string.pattern.invert.base': i18n._(t`The description cannot contain links `)
      })
  })

  const methods = useForm<FormProps>({
    resolver: joiResolver(
      schema
    ),
    defaultValues: {
      description: data.description
    }
  })

  const [description, setDescription] = useState(data.description)

  const descriptionProgressPercentage = (description.length / MAXIMUM_CHARACTER_COUNT) * 100

  const {
    watch
  } = methods

  const onSubmit = (formValues): void => {
    commit({
      variables: {
        input: {
          id: data.id,
          locale: 'en',
          ...formValues
        }
      },
      onCompleted () {
        onClose()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating the description`
        })
      }
    })
  }

  const onRemove = (): void => {
    commit({
      variables: {
        input: {
          id: data.id,
          locale: 'en',
          description: ''
        }
      },
      onCompleted () {
        onClose()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error removing the description`
        })
      }
    })
  }

  useEffect(() => {
    const subscription = watch((value, {
      name
    }) => {
      if (name === 'description') {
        setDescription(value.description ?? '')
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <Form {...methods} onSubmit={onSubmit}>
      <Stack spacing={6}>
        <FormInput
          size='lg'
          id='description'
        >
          <InputBody>
            <TextareaInput
              ref={inputRef}
              minH={150}
              variant='filled'
              placeholder={
                i18n._(t`Tell your fans what it's really all about`)
              }
            />
          </InputBody>
          <InputFooter />
        </FormInput>
        <HStack justify='space-between'>
          {data.description.length !== 0
            ? (
              <IconButton
                onClick={onRemove}
                aria-label={i18n._(t`Clear Description`)}
                icon={<Icon icon={DeleteBin} h={5} w={5} fill='gray.300' />}
                size='lg'
                variant='solid'
                colorScheme='gray'
                isLoading={IsInFlight}
              />
              )
            : <Flex />}
          <HStack justify='flex-end' spacing={2}>
            {description.length !== 0 && (
              <CircularProgress
                trackColor='gray.500'
                thickness='12px'
                color={descriptionProgressPercentage >= 100 ? 'orange.300' : (descriptionProgressPercentage > 60 ? 'purple.300' : 'teal.300')}
                value={descriptionProgressPercentage}
              />
            )}
            <FormSubmitIconButton
              aria-label={i18n._(t`Update Description`)}
              icon={<Icon icon={CheckMark} h={5} w={5} fill='green.900' />}
              size='lg'
              variant='solid'
              colorScheme='green'
              isLoading={IsInFlight}
            />
          </HStack>
        </HStack>
      </Stack>
    </Form>
  )
}
