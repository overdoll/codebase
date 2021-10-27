/**
 * @flow
 */
import type { Node } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import {
  Stack
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import File from './File/File'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
};

export default function ProcessUploads ({ state, dispatch, uppy }: Props): Node {
  const [t] = useTranslation('manage')

  if (state.files.length < 1) {
    return <></>
  }

  return (
    <>
      <Stack spacing={2}>
        {state.files.map((file, index) => {
          return (
            <File
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
