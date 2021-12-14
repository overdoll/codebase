/**
 * @flow
 */
import type { Node } from 'react'
import { useEffect } from 'react'
import type { Dispatch, State } from '@//:types/upload'
import { Box, Flex, Heading, Spinner, Stack, Text, useToast } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import { graphql, useMutation } from 'react-relay/hooks'
import { StringParam, useQueryParam } from 'use-query-params'
import { useTranslation } from 'react-i18next'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import DragOverFileInput from '../../../components/DragOverFileInput/DragOverFileInput'
import FilePicker from '../../../components/FilePicker/FilePicker'
import { FileUpload, PauseCircle } from '../../../../../../../../assets/icons/interface'
import Icon from '@//:modules/content/Icon/Icon'
import Button from '@//:modules/form/Button'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch
};

const Mutation = graphql`
  mutation CreatePostFlowMutation {
    createPost {
      post {
        reference
      }
    }
  }
`

export default function CreatePostFlow ({ uppy, state, dispatch }: Props): Node {
  const [, setPostReference] = useQueryParam('id', StringParam)

  const [createPost, isCreatingPost] = useMutation(Mutation)

  const [t] = useTranslation('manage')

  const notify = useToast()

  const onCreatePost = () => {
    createPost({
      onCompleted (payload) {
        setPostReference(x => {
          return payload.createPost.post.reference
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t('create_post.flow.create.query.error'),
          isClosable: true
        })
      }
    })
  }

  useEffect(() => {
    uppy.once('file-added', file => {
      onCreatePost()
    })
  }, [uppy])

  if (isCreatingPost) {
    return (
      <LargeBackgroundBox>
        <Flex
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='500px'
        >
          <Stack spacing={4} align='center'>
            <Spinner mb={6} thickness={4} size='lg' color='primary.500' />
            <Text color='gray.100'>{t('create_post.flow.create.creating')}</Text>
          </Stack>
        </Flex>
      </LargeBackgroundBox>
    )
  }

  return (
    <FilePicker uppy={uppy}>
      <DragOverFileInput uppy={uppy}>
        <LargeBackgroundBox>
          <Flex
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='500px'
          >
            <Stack spacing={4} align='center'>
              <Icon
                w={12} h={12}
                icon={FileUpload}
                fill='teal.300'
              />
              <Box>
                <Heading color='gray.00' fontSize='4xl'>
                  {t('create_post.flow.create.uploader.title')}
                </Heading>
                <Text color='gray.200'>
                  {t('create_post.flow.create.uploader.description')}
                </Text>
              </Box>
            </Stack>
          </Flex>
        </LargeBackgroundBox>
      </DragOverFileInput>
    </FilePicker>
  )
}
