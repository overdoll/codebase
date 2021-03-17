import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import ThumbnailGenerator from '@uppy/thumbnail-generator';

const U = new Uppy({
  restrictions: { maxNumberOfFiles: 10 },
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

// if (CanUseDOM) {
//   // Allow resuming uploads if user refreshes or navigates away (browser-only)
//   U.use(GoldenRetriever, { serviceWorker: false });
// }

// Resume-able uploads on the API
U.use(Tus, { endpoint: '/api/upload/' });

export default U;
