import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import GoldenRetriever from '@uppy/golden-retriever';
import CanUseDOM from '@//:modules/utilities/CanUseDOM';
import ThumbnailGenerator from '@uppy/thumbnail-generator';

const U = new Uppy({
  restrictions: { maxFileSize: 0 },
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
