/**
 * @flow
 */
import type { Node } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import {
  Flex,
  Text,
  CloseButton,
  Progress,
  HStack,
  Spinner, Alert, AlertIcon, AlertDescription, Button, Box, Stack, Fade, useDisclosure
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import FileUploadProgress from './FileUploadProgress/FileUploadProgress'
import { useEffect, useState } from 'react'
import { graphql, useMutation } from 'react-relay/hooks'
import type { ProcessUploadsMutation } from '@//:artifacts/ProcessUploadsMutation.graphql'
import ButtonRefreshArrows
  from '@streamlinehq/streamlinehq/img/streamline-bold/interface-essential/multimedia-controls/button-refresh-arrows.svg'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
};

export default function ProcessUploads ({ state, dispatch, uppy }: Props): Node {
  const [t] = useTranslation('manage')

  const { isOpen, onOpen } = useDisclosure()

  /*
  <Fade in>
          <Flex
            p={4} direction='column' bg='dimmers.900' w='100%' h='100%' position='absolute'
            borderRadius={10} backdropFilter='blur(5px)'
          >
            hello
          </Flex>
        </Fade>
   */

  return (
    <>
      {false &&
        <Alert status='warning'>
          <Flex w='100%' align='center' justify='space-between'>
            <Flex align='center'>
              <AlertIcon />
              <AlertDescription>
                {t('posts.flow.steps.arrange.uploader.processing.error.message')}
              </AlertDescription>
            </Flex>
            <Button
              size='sm'
              leftIcon={<Icon icon={ButtonRefreshArrows} w={4} h={4} fill='orange.900' />}
              colorScheme='orange' variant='solid'
            >{t('posts.flow.steps.arrange.error.button')}
            </Button>
          </Flex>
        </Alert>}
      <Stack spacing={2}>
        {state.files.map((file, index) => {
          return (
            <FileUploadProgress
              disabled={false} key={index} uppy={uppy}
              state={state} file={file}
              dispatch={dispatch}
            />
          )
        })}
      </Stack>
    </>
  )
}
