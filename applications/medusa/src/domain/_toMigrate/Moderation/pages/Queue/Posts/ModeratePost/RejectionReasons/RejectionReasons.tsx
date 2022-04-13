import { useEffect, useState } from 'react'
import { Flex, Stack } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import type { RejectionReasonsFragment$key } from '@//:artifacts/RejectionReasonsFragment.graphql'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents/Alert/Alert'
import {
  TextareaInput,
  Form,
  FormInput,
  FormSubmitButton,
  InputFooter,
  InputHeader,
  SelectInput
} from '@//:modules/content/HookedComponents/Form'
import ModerationNote from '../../../../../validation/ModerationNote'

interface NoteValues {
  note: string
  rejectionId: string
}

interface Props {
  infractions: RejectionReasonsFragment$key
  isModeratingPost: boolean
  onSubmit: (data: NoteValues) => void
}

const InfractionsGQL = graphql`
  fragment RejectionReasonsFragment on Query {
    rules {
      edges {
        node {
          id
          title
          infraction
        }
      }
    }
  }
`

export default function RejectionReasons ({
  onSubmit,
  infractions,
  isModeratingPost
}: Props): JSX.Element {
  const data = useFragment(InfractionsGQL, infractions)

  const { i18n } = useLingui()

  const [infraction, setInfraction] = useState<boolean>(false)

  const findInfraction = (id): void => {
    setInfraction(data.rules.edges.filter((item) => item.node.id === id)[0]?.node.infraction)
  }

  const schema = Joi.object({
    rejectionId: Joi
      .string()
      .required()
      .messages({
        'any.required': i18n._(t`Please select a rejection reason`)
      }),
    note: ModerationNote()
  })

  const methods = useForm<NoteValues>({
    resolver: joiResolver(
      schema
    )
  })

  const { watch } = methods

  useEffect(() => {
    const subscription = watch((value, {
      name
    }) => {
      if (name === 'rejectionId') {
        findInfraction(value)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <Form {...methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <FormInput
          size='md'
          id='rejectionId'
        >
          <InputHeader>
            <Trans>
              Reason
            </Trans>
          </InputHeader>
          <SelectInput placeholder={i18n._(t`Select the rejection reason`)}>
            {data.rules.edges.map((item, index) =>
              <option key={index} value={item.node.id}>{item.node.title}</option>
            )}
          </SelectInput>
          <InputFooter />
        </FormInput>
        <FormInput
          size='md'
          id='note'
        >
          <InputHeader>
            <Trans>
              Note
            </Trans>
          </InputHeader>
          <TextareaInput placeholder={i18n._(t`Add a note describing the reason in detail...`)} />
          <InputFooter />
        </FormInput>
        {infraction &&
          <Alert mt={1} mb={1} status='warning'>
            <AlertIcon mt={1} mb={3} />
            <AlertDescription>
              <Trans>
                This rejection reason is an infraction. The poster's account will be temporarily suspended.
              </Trans>
            </AlertDescription>
          </Alert>}
        <Flex justify='flex-end'>
          <FormSubmitButton
            size='md'
            colorScheme='orange'
            isLoading={isModeratingPost}
          >
            <Trans>
              Reject Post
            </Trans>
          </FormSubmitButton>
        </Flex>
      </Stack>
    </Form>
  )
}
