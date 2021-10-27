/**
 * @flow
 */
import type { Node } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import { graphql, useFragment } from 'react-relay/hooks'
import {
  Flex,
  Stack
} from '@chakra-ui/react'
import FilePicker from '../../../FilePicker/FilePicker'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceUploadBox2
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/upload-download/interface-upload-box-2.svg'
import { useTranslation } from 'react-i18next'
import type { ArrangeFragment$key } from '@//:artifacts/ArrangeFragment.graphql'
import ProcessUploads from './ProcessUploads/ProcessUploads'
import ArrangeUploads from './ArrangeUploads/ArrangeUploads'
import Button from '@//:modules/form/Button'

type Props = {
  uppy: Uppy,
  state: State,
  dispatch: Dispatch,
  query: ArrangeFragment$key
};

const ArrangeFragmentGQL = graphql`
  fragment ArrangeFragment on Post {
    ...ArrangeUploadsFragment
  }
`

export default function Arrange ({ uppy, dispatch, state, query }: Props): Node {
  const data = useFragment(ArrangeFragmentGQL, query)

  const [t] = useTranslation('manage')

  return (

    <Stack spacing={2}>
      <FilePicker w='auto' uppy={uppy}>
        <Flex w='100%' align='center' justify='flex-end'>
          <Button
            w='100%'
            rightIcon={<Icon h={4} w={4} icon={InterfaceUploadBox2} fill='gray.100' />}
          >{t('posts.flow.steps.arrange.uploader.picker')}
          </Button>
        </Flex>
      </FilePicker>
      <ProcessUploads uppy={uppy} state={state} dispatch={dispatch} />
      <ArrangeUploads uppy={uppy} state={state} dispatch={dispatch} query={data} />
    </Stack>

  )
}
