import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import CanUseDOM from '@//:modules/utilities/CanUseDOM';
import GoldenRetriever from '@uppy/golden-retriever';
import DropTarget from '@uppy/drop-target';

const U = new Uppy({
  id: 'posts',
  restrictions: {
    maxNumberOfFiles: 10,
    allowedFileTypes: ['image/jpeg', 'image/png', 'video/mp4', 'image/jpg'],
  },
  autoProceed: true,
  allowMultipleUploads: true,
});

if (CanUseDOM) {
  // Allow resuming uploads if user refreshes or navigates away (browser-only)
  U.use(GoldenRetriever, { serviceWorker: false });

  // Generate thumbnails for the user to see
  U.use(require('./plugins/AllThumbnailGenerator'), {
    id: 'ThumbnailGenerator',
    thumbnailWidth: 200,
    thumbnailHeight: 200,
    thumbnailType: 'image/jpeg',
    waitForThumbnailsBeforeUpload: false,
  });

  U.use(DropTarget, {});
}

// Resume-able uploads on the API
U.use(Tus, { endpoint: '/api/upload/' });

export default U;
