/**
 * @flow
 */
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import {
  Alert, AlertDescription,
  AlertIcon, Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Select,
  Stack, Textarea, useToast
} from '@chakra-ui/react'
import { usePreloadedQuery } from 'react-relay'
import type { ModeratePostInfractionsQuery } from '@//:artifacts/ModeratePostInfractionsQuery.graphql'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { PreloadedQuery } from 'react-relay/hooks'

type NoteValues = {
  note: string,
  rejectionId: string,
};

type Props = {
  isModeratingPost: boolean,
  moderatePost: () => void,
  postId: string,
  query: ModeratePostInfractionsQuery,
  queryRef: ModeratePostInfractionsQuery,
  onClose: () => void,
  refresh: () => void,
}

const schema = Joi.object({
  rejectionId: Joi.string().required(),
  note: Joi.string().required()
})

export default function RejectionReasons (props: Props): Node {
  const [t] = useTranslation('moderation')

  const data = usePreloadedQuery<ModeratePostInfractionsQuery>(
    props.query,
    props.queryRef
  )

  const [infraction, setInfraction] = useState(null)

  const notify = useToast()

  const findInfraction = (id) => {
    setInfraction(data.rejectionReasons.filter((item) => item.id === id)[0]?.infraction)
  }

  const onReject = (formData) => {
    props.moderatePost({
      variables: {
        postId: props.postId,
        reasonId: formData.rejectionId,
        notes: formData.note
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t('queue.post.actions.deny.query.success', { id: props.postId }),
          isClosable: true
        })
        props.onClose()
        props.refresh()
      },
      onError () {
        notify({
          status: 'error',
          title: t('queue.post.actions.deny.query.error', { id: props.postId }),
          isClosable: true
        })
      }
    })
  }

  const { register, handleSubmit, formState: { errors } } = useForm<NoteValues>({
    resolver: joiResolver(
      schema
    )
  })

  return (
    <>
      <form onSubmit={handleSubmit(onReject)}>
        <Stack spacing={3}>
          <FormControl isRequired isInvalid={errors.rejectionId}>
            <FormLabel>
              {t('queue.post.actions.deny.modal.form.dropdown.label')}
            </FormLabel>
            <Select
              {...register('rejectionId', { required: true })}
              onChange={(e) => findInfraction(e.target.value)}
              placeholder={t('queue.post.actions.deny.modal.form.dropdown.placeholder')}
            >
              {data.rejectionReasons.map((item, index) =>
                <option key={index} value={item.id}>{item.reason}</option>
              )}
            </Select>
            <FormErrorMessage
              color='orange.300'
            >{t('queue.post.actions.deny.modal.form.validation.rejectionId.error')}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors.note}>
            <FormLabel>
              {t('queue.post.actions.deny.modal.form.textarea.label')}
            </FormLabel>
            <Textarea
              isInvalid={errors.note} {...register('note', { maxLength: 255 })}
              placeholder={t('queue.post.actions.deny.modal.form.textarea.placeholder')}
            />
            <FormErrorMessage
              color='orange.300'
            >{t('queue.post.actions.deny.modal.form.validation.note.error')}
            </FormErrorMessage>
          </FormControl>
          {infraction &&
            <Alert borderRadius={5} mt={1} mb={1} status='warning'>
              <AlertIcon mt={1} mb={3} />
              <AlertDescription>{t('queue.post.actions.deny.modal.infraction')}
              </AlertDescription>
            </Alert>}
          <Flex justify='flex-end'>
            <Button
              isDisabled={errors.rejectionId || errors.note} isLoading={props.isModeratingPost} size='md'
              colorScheme='orange' type='submit'
            >{t('queue.post.actions.deny.modal.form.submit')}
            </Button>
          </Flex>
        </Stack>
      </form>
    </>
  )
}
