/**
 * @flow
 */
import type { Node } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  CloseButton,
  Progress,
  HStack,
  CircularProgress,
  Spinner, AlertIcon, AlertDescription, Button, Alert, Fade,
  useDisclosure
} from '@chakra-ui/react'
import DragOverFileInput from '../../../DragOverFileInput/DragOverFileInput'
import FilePicker from '../../../FilePicker/FilePicker'
import Icon from '@//:modules/content/Icon/Icon'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import InterfaceUploadBox2
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/upload-download/interface-upload-box-2.svg'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import type { ArrangeFragment$key } from '@//:artifacts/ArrangeFragment.graphql'
import ProcessUploads from './ProcessUploads/ProcessUploads'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: ArrangeFragment$key
};

const ArrangeFragmentGQL = graphql`
  fragment ArrangeFragment on Post {
    id
    content {
      urls {
        url
      }
    }
  }
`

export default function Arrange ({ uppy, dispatch, state, query }: Props): Node {
  const data = useFragment(ArrangeFragmentGQL, query)

  const [t] = useTranslation('manage')

  return (
    <Stack spacing={4}>
      <Box>
        <FilePicker w='auto' uppy={uppy}>
          <Flex mb={2}>
            <IconButton
              variant='ghost'
              aria-label='add files'
              icon={<Icon h={5} w={5} icon={InterfaceUploadBox2} fill='gray.100' />}
            />
          </Flex>
        </FilePicker>
        <ProcessUploads uppy={uppy} state={state} dispatch={dispatch} />
      </Box>
      {data.content.map((item, index) => {
        return (<Flex key={index}>item {index}</Flex>)
      })}
    </Stack>
  )
}
