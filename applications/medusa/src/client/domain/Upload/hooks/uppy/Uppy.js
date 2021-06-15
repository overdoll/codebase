/**
 * @flow
 */

import type { Uppy as UppyType } from '@uppy/core'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import CanUseDOM from '@//:modules/utilities/CanUseDOM'
import DropTarget from '@uppy/drop-target'
import GoldenRetriever from '@uppy/golden-retriever'

const U: UppyType = new Uppy({
  id: 'posts',
  restrictions: {
    maxNumberOfFiles: 10,
    allowedFileTypes: ['image/jpeg', 'image/png', 'video/mp4', 'image/jpg'],
    maxFileSize: 25000000
  },
  autoProceed: true,
  allowMultipleUploads: true
})

if (CanUseDOM) {
  // Allow resuming uploads if user refreshes or navigates away (browser-only)
  U.use(GoldenRetriever, { serviceWorker: false })

  // Generate thumbnails for the user to see
  U.use(require('./plugins/AllThumbnailGenerator'), {
    id: 'ThumbnailGenerator',
    thumbnailWidth: 200,
    thumbnailHeight: 200,
    thumbnailType: 'image/jpeg',
    waitForThumbnailsBeforeUpload: false
  })

  // TODO Add drag and drop for uploads
  // U.use(DropTarget, { target: document.getElementById('largeUpload') })
}

// Resume-able uploads on the API
U.use(Tus, { endpoint: '/api/upload/' })

export default U
