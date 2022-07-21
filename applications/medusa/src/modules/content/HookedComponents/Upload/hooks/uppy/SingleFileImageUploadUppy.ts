import type { Uppy as UppyType } from '@uppy/core'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import CanUseDOM from '../../../../../operations/CanUseDOM'
import GoldenRetriever from '@uppy/golden-retriever'
import { CLUB_ALLOWED_FILE_TYPES, GENERIC_MAX_FILE_SIZE, TUS_OPTIONS } from '../../constants/upload'

const U: UppyType = Uppy({
  id: 'single-file-upload',
  restrictions: {
    maxNumberOfFiles: 1,
    allowedFileTypes: CLUB_ALLOWED_FILE_TYPES,
    maxFileSize: GENERIC_MAX_FILE_SIZE
  },
  autoProceed: true,
  allowMultipleUploads: false
}
)

if (CanUseDOM) {
  // Allow resuming uploads if user refreshes or navigates away (browser-only)
  U.use(GoldenRetriever, { serviceWorker: false })
}

// Resume-able uploads on the API
U.use(Tus, TUS_OPTIONS)

export default U
