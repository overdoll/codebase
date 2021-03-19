import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import ThumbnailGenerator from '@uppy/thumbnail-generator';
import CanUseDOM from '@//:modules/utilities/CanUseDOM';
import GoldenRetriever from '@uppy/golden-retriever';

const U = new Uppy({
  restrictions: {
    maxNumberOfFiles: 10,
    allowedFileTypes: ['image/jpeg', 'image/png', 'video/mp4'],
  },
  autoProceed: true,
  allowMultipleUploads: true,
});

// Generate thumbnails for the user to see
U.use(ThumbnailGenerator, {
  id: 'ThumbnailGenerator',
  thumbnailWidth: 200,
  thumbnailHeight: 200,
  thumbnailType: 'image/jpeg',
  waitForThumbnailsBeforeUpload: false,
});

if (CanUseDOM) {
  // Allow resuming uploads if user refreshes or navigates away (browser-only)
  U.use(GoldenRetriever, { serviceWorker: false });
}

// Resume-able uploads on the API
U.use(Tus, { endpoint: '/api/upload/' });

export default U;
