import type { Uppy as UppyType } from '@uppy/core'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import CanUseDOM from '../../../../../operations/CanUseDOM'
import GoldenRetriever from '@uppy/golden-retriever'
import { MAX_FILE_SIZE, TUS_OPTIONS, UPLOAD_ALLOWED_FILE_TYPES } from '../../constants/upload'

// TODO changing the name of the file to prevent duplicates issue breaks tus

const U: UppyType = Uppy({
  id: 'posts',
  restrictions: {
    maxNumberOfFiles: 10,
    allowedFileTypes: UPLOAD_ALLOWED_FILE_TYPES,
    maxFileSize: MAX_FILE_SIZE
  },
  autoProceed: true,
  allowMultipleUploads: true
}
)

if (CanUseDOM) {
  // Allow resuming uploads if user refreshes or navigates away (browser-only)
  U.use(GoldenRetriever, { serviceWorker: false })
}

// Resume-able uploads on the API
U.use(Tus, TUS_OPTIONS)

export default U
