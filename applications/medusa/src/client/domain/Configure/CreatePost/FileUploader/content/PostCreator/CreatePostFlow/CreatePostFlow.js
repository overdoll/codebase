/**
 * @flow
 */
import type { Node } from 'react';
import { useEffect } from 'react';
import type { Dispatch, State } from '@//:types/upload';
import { Flex, Heading, Spinner, Text, useToast } from '@chakra-ui/react';
import type { Uppy } from '@uppy/core';
import { graphql, useMutation } from 'react-relay/hooks';
import { StringParam, useQueryParam } from 'use-query-params';
import { useTranslation } from 'react-i18next';
import { LargeBackgroundBox } from '@//:modules/content/PageLayout';
import DragOverFileInput from '../../../components/DragOverFileInput/DragOverFileInput';
import FilePicker from '../../../components/FilePicker/FilePicker';
import { FileUpload } from '../../../../../../../../assets/icons/interface';
import Icon from '@//:modules/content/Icon/Icon';

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
  const [postReference, setPostReference] = useQueryParam('id', StringParam)

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
          h={400}
        >
          <Spinner mb={6} thickness={4} size='lg' color='primary.500' />
          <Text fontSize='md' color='gray.100'>{t('create_post.flow.create.creating')}</Text>
        </Flex>
      </LargeBackgroundBox>
    )
  }

  return (
    <FilePicker uppy={uppy}>
      <DragOverFileInput uppy={uppy}>
        <LargeBackgroundBox w='100%'>
          <Flex
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            h={400}
          >
            <Icon
              w={12} h={12}
              mb={4}
              icon={FileUpload}
              fill='teal.300'
            />
            <Heading color='gray.00' fontSize='3xl'>
              {t('create_post.flow.create.uploader.title')}
            </Heading>
          </Flex>
        </LargeBackgroundBox>
      </DragOverFileInput>
    </FilePicker>
  )
}
