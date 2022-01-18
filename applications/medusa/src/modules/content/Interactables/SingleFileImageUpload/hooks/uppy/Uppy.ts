import type { Uppy as UppyType } from '@uppy/core'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import CanUseDOM from '../../../../../operations/CanUseDOM'
import GoldenRetriever from '@uppy/golden-retriever'

const U: UppyType = Uppy({
  id: 'single-file-upload',
  restrictions: {
    maxNumberOfFiles: 1,
    allowedFileTypes: ['image/jpeg', 'image/png'],
    maxFileSize: 25000000
  },
  autoProceed: true,
  allowMultipleUploads: false,
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
U.use(Tus, { endpoint: '/api/upload/' })

export default U
