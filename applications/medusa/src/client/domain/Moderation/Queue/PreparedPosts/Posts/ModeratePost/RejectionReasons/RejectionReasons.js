/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import {
  Alert, AlertDescription,
  AlertIcon, Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Stack, Textarea
} from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import type { RejectionReasonsFragment$key } from '@//:artifacts/RejectionReasonsFragment.graphql'

type NoteValues = {
  note: string,
  rejectionId: string,
};

type Props = {
  infractions: RejectionReasonsFragment$key,
  isModeratingPost: boolean,
  onSubmit: () => void
}

const InfractionsGQL = graphql`
  fragment RejectionReasonsFragment on Query {
    postRejectionReasons {
      edges {
        node {
          id
          reason
          infraction
        }
      }
    }
  }
`

const schema = Joi.object({
  rejectionId: Joi.string().required(),
  note: Joi.string().required()
})

export default function RejectionReasons (props: Props): Node {
  const [t] = useTranslation('moderation')

  const data = useFragment(InfractionsGQL, props.infractions)

  const [infraction, setInfraction] = useState(null)

  const findInfraction = (id) => {
    setInfraction(data.postRejectionReasons.edges.filter((item) => item.node.id === id)[0]?.node.infraction)
  }

  const { register, handleSubmit, formState: { errors } } = useForm<NoteValues>({
    resolver: joiResolver(
      schema
    )
  })

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <Stack spacing={3}>
        <FormControl isRequired isInvalid={errors.rejectionId}>
          <FormLabel>
            {t('queue.post.actions.reject.modal.form.dropdown.label')}
          </FormLabel>
          <Select
            {...register('rejectionId', { required: true })}
            onChange={(e) => findInfraction(e.target.value)}
            placeholder={t('queue.post.actions.reject.modal.form.dropdown.placeholder')}
          >
            {data.postRejectionReasons.edges.map((item, index) =>
              <option key={index} value={item.node.id}>{item.node.reason}</option>
            )}
          </Select>
          <FormErrorMessage
            color='orange.300'
          >{t('queue.post.actions.reject.modal.form.validation.rejectionId.error')}
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={errors.note}>
          <FormLabel>
            {t('queue.post.actions.reject.modal.form.textarea.label')}
          </FormLabel>
          <Textarea
            resize='none'
            isInvalid={errors.note} {...register('note', { maxLength: 255 })}
            placeholder={t('queue.post.actions.reject.modal.form.textarea.placeholder')}
          />
          <FormErrorMessage
            color='orange.300'
          >{t('queue.post.actions.reject.modal.form.validation.note.error')}
          </FormErrorMessage>
        </FormControl>
        {infraction &&
          <Alert borderRadius={5} mt={1} mb={1} status='warning'>
            <AlertIcon mt={1} mb={3} />
            <AlertDescription>{t('queue.post.actions.reject.modal.infraction')}
            </AlertDescription>
          </Alert>}
        <Flex justify='flex-end'>
          <Button
            isDisabled={errors.rejectionId || errors.note} isLoading={props.isModeratingPost} size='md'
            colorScheme='orange' type='submit'
          >{t('queue.post.actions.reject.modal.form.submit')}
          </Button>
        </Flex>
      </Stack>
    </form>
  )
}
