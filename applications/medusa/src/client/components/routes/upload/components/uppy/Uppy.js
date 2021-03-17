import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import GoldenRetriever from '@uppy/golden-retriever';
import CanUseDOM from '@//:modules/utilities/CanUseDOM';
import ThumbnailGenerator from '@uppy/thumbnail-generator';

const U = new Uppy({
  restrictions: { maxNumberOfFiles: 10 },
  autoProceed: true,
});

U.use(ThumbnailGenerator, {
  id: 'ThumbnailGenerator',
  thumbnailWidth: 200,
  thumbnailHeight: 200,
  thumbnailType: 'image/jpeg',
  waitForThumbnailsBeforeUpload: false,
});

if (CanUseDOM) {
  U.use(GoldenRetriever, { serviceWorker: false });
}

U.use(Tus, { endpoint: '/api/upload/' });

export default U;
