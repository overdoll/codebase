/**
 * @flow
 */
import type { Node } from 'react'
import type { Dispatch, ResourceUrl, State } from '@//:types/upload'
import { Box, Skeleton, Image, Img, Flex, Spinner, Text, Heading, useToast } from '@chakra-ui/react'
import SuspenseImage from '@//:modules/utilities/SuspenseImage'
import type { Uppy } from '@uppy/core'
import { useEffect } from 'react'
import { graphql, useMutation } from 'react-relay/hooks'
import { StringParam, useQueryParam } from 'use-query-params'
import { useTranslation } from 'react-i18next'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import DragOverFileInput from '../../DragOverFileInput/DragOverFileInput'
import FilePicker from '../../FilePicker/FilePicker'

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
          title: t('posts.flow.create.query.error'),
          isClosable: true
        })
      }
    })
  }

  useEffect(() => {
    uppy.on('file-added', file => {
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
          <Text fontSize='md' color='gray.100'>{t('posts.flow.create.creating')}</Text>
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
            h={400}
          >
            <Heading color='gray.00' fontSize='4xl'>
              {t('posts.flow.create.uploader.title')}
            </Heading>
          </Flex>
        </LargeBackgroundBox>
      </DragOverFileInput>
    </FilePicker>
  )
}
