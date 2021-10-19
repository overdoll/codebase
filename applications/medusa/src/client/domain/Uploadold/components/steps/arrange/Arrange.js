/**
 * @flow
 */
import type { Node } from 'react'
import { Flex, Heading, Box, Stack, Text, IconButton } from '@chakra-ui/react'
import type { Uppy } from '@uppy/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import File from './components/file/File'
import type { Dispatch, State } from '@//:types/upload'
import { EVENTS } from '../../../constants/constants'
import { useTranslation } from 'react-i18next'
import FilePicker from '../../../../Manage/Posts/ViewerDraftPosts/CreatePost/Upload/components/FilePicker/FilePicker'
import DragOverFileInput from '../../../../Manage/Posts/ViewerDraftPosts/CreatePost/Upload/components/DragOverFileInput/DragOverFileInput'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceUploadBox2
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/upload-download/interface-upload-box-2.svg'

type Props = {
  uppy: Uppy,
  dispatch: Dispatch,
  state: State,
};

// a little function to help us with reordering the result
const reorder = (
  list: Array<string>,
  startIndex: number,
  endIndex: number
): Array<string> => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export default function Arrange ({
  uppy,
  state,
  dispatch
}: Props): Node {
  // OnRemoveFile - remove a file from the list
  const onRemoveFile = id => {
    uppy.removeFile(id)

    dispatch({ type: EVENTS.FILES, value: { id: id }, remove: true })

    if (state.files.length === 1) {
      // if last file, then we cleanup
      uppy.reset()
      dispatch({ type: EVENTS.STEP, value: null })
    } else {
      // if not the last file, clean up the state
      dispatch({
        type: EVENTS.PROGRESS,
        value: { [id]: state.progress[id] },
        remove: true
      })

      dispatch({
        type: EVENTS.THUMBNAILS,
        value: { [id]: state.thumbnails[id] },
        remove: true
      })

      dispatch({
        type: EVENTS.URLS,
        value: { [id]: state.urls[id] },
        remove: true
      })
    }
  }

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const files = reorder(
      state.files,
      result.source.index,
      result.destination.index
    )

    dispatch({ type: EVENTS.ARRANGE_FILES, value: files })
  }

  const [t] = useTranslation('upload')

  return (
    <>
      <Heading fontSize='3xl' color='gray.00' mb={4}>
        {t('arrange.header')}
      </Heading>
      <DragOverFileInput w='100%' uppy={uppy}>
        <Box w='100%' align='right'>
          <Flex p={1} borderRadius={5} bg='gray.800' mb={2} align='center' justify='space-between'>
            <Text pl={2} color='gray.100'>{t('arrange.count', { count: state.files.length })}</Text>
            <FilePicker w='auto' uppy={uppy}>
              <IconButton
                variant='ghost'
                aria-label='add files'
                icon={<Icon h={5} w={5} icon={InterfaceUploadBox2} fill='gray.100' />}
              />
            </FilePicker>
          </Flex>
          <DragDropContext nonce={window.__webpack_nonce__} onDragEnd={onDragEnd}>
            <Droppable droppableId='upload'>
              {(provided, snapshot) => (
                // the list
                <Stack
                  spacing={snapshot.isDragging ? 3 : 1}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {state.files.map((file, index) => (
                    // the item
                    <File
                      key={file.id}
                      file={file}
                      thumbnail={state.thumbnails[file.id]}
                      progress={state.progress[file.id]}
                      onRemove={onRemoveFile}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </DragOverFileInput>
    </>
  )
}
