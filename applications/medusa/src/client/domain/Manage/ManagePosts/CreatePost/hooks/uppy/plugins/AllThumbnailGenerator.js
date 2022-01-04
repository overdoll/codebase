import ThumbnailGenerator from '@uppy/thumbnail-generator';
import VideoThumbnails from './VideoThumbnailGenerator';

function previewSupported(fileType) {
  if (!fileType) return false;
  const fileTypeSpecific = fileType.split('/')[1];

  // extend the default to include mp4 files
  return /^(jpe?g|png|bmp|mp4|webm|webp|avif)$/u.test(fileTypeSpecific);
}

module.exports = class AllThumbnailGenerator extends ThumbnailGenerator {
  // Extending the default thumbnail generator to support video thumbnail generation

  requestThumbnail(file) {
    if (previewSupported(file.type) && !file.isRemote) {
      return this.createThumbnail(
        file,
        this.opts.thumbnailWidth,
        this.opts.thumbnailHeight,
      )
        .then(preview => {
          this.setPreviewURL(file.id, preview);
          this.uppy.log(
            `[ThumbnailGenerator] Generated thumbnail for ${file.id}`,
          );
          this.uppy.emit(
            'thumbnail:generated',
            this.uppy.getFile(file.id),
            preview,
          );
        })
        .catch(err => {
          this.uppy.log(
            `[ThumbnailGenerator] Failed thumbnail for ${file.id}:`,
            'warning',
          );
          this.uppy.log(err, 'warning');
          this.uppy.emit('thumbnail:error', this.uppy.getFile(file.id), err);
        });
    }
    return Promise.resolve();
  }

  onFileAdded = file => {
    if (!file.preview && previewSupported(file.type) && !file.isRemote) {
      this.addToQueue(file.id);
    }
  };

  createThumbnail(file, targetWidth, targetHeight) {
    // special case for videos to use a custom generator
    if (file.type.includes('video')) {
      return new Promise(resolve => {
        const thumbnailCount = 1;
        const thumbnails = new VideoThumbnails({
          count: thumbnailCount,
          maxWidth: targetWidth,
          maxHeight: targetHeight,
        });

        thumbnails.capture(file.data);

        thumbnails.on('capture', image => {
          resolve(URL.createObjectURL(image));
        });
      });
    }

    return ThumbnailGenerator.prototype.createThumbnail(
      file,
      targetWidth,
      targetHeight,
    );
  }
};
