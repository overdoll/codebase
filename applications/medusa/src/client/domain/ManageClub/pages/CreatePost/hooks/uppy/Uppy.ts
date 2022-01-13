import type { Uppy as UppyType } from '@uppy/core'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import CanUseDOM from '@//:modules/operations/CanUseDOM'
import GoldenRetriever from '@uppy/golden-retriever'

const U: UppyType = Uppy({
  id: 'posts',
  restrictions: {
    maxNumberOfFiles: 10,
    allowedFileTypes: ['image/jpeg', 'image/png', 'video/mp4', 'image/jpg'],
    maxFileSize: 25000000
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
U.use(Tus, { endpoint: '/api/upload/' })

export default U
