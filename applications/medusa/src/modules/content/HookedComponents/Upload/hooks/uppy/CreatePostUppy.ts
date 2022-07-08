import type { Uppy as UppyType } from '@uppy/core'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import CanUseDOM from '../../../../../operations/CanUseDOM'
import GoldenRetriever from '@uppy/golden-retriever'
import { MAX_FILE_SIZE, UPLOAD_ALLOWED_FILE_TYPES } from '../../constants/upload'

const U: UppyType = Uppy({
  id: 'posts',
  restrictions: {
    maxNumberOfFiles: 10,
    allowedFileTypes: UPLOAD_ALLOWED_FILE_TYPES,
    maxFileSize: MAX_FILE_SIZE
  },
  autoProceed: true,
  allowMultipleUploads: true,
  onBeforeFileAdded: (currentFile, files) => {
    return {
      ...currentFile,
      id: `${currentFile.id}__${Date.now()}`,
      name: `${currentFile.name}__${Date.now()}`
    }
  }
}
)

if (CanUseDOM) {
  // Allow resuming uploads if user refreshes or navigates away (browser-only)
  U.use(GoldenRetriever, { serviceWorker: false })
}

// Resume-able uploads on the API
U.use(Tus, {
  endpoint: '/api/upload/',
  retryDelays: [0, 1000, 3000, 5000],
  chunkSize: 10485760
})

export default U
