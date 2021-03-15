import Uppy from '@uppy/core';
import Tus from '@uppy/tus';

const U = new Uppy({
  restrictions: { maxNumberOfFiles: 10 },
  autoProceed: true,
});

U.use(Tus, { endpoint: '/api/upload/' });

export default U;
