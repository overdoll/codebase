import type { Uppy as UppyType } from '@uppy/core'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import CanUseDOM from '../../../../../operations/CanUseDOM'
import GoldenRetriever from '@uppy/golden-retriever'
import { TUS_OPTIONS, UPLOAD_ALLOWED_FILE_TYPES, UPLOAD_MAX_FILE_SIZE } from '../../constants/upload'

const U: UppyType = Uppy({
  id: 'posts',
  restrictions: {
    maxNumberOfFiles: 40,
    allowedFileTypes: UPLOAD_ALLOWED_FILE_TYPES,
    maxFileSize: UPLOAD_MAX_FILE_SIZE
  },
  autoProceed: true,
  allowMultipleUploads: true
}
)

if (CanUseDOM) {
  // Allow resuming uploads if user refreshes or navigates away (browser-only)
  U.use(GoldenRetriever, {
    serviceWorker: false
  })
}

// Resume-able uploads on the API
U.use(Tus, {
  ...TUS_OPTIONS
})

export default U
