/**
 * Static assets
 */
// For static background images used on the site
export { default as StaticImageCover } from './components/StaticImageCover/StaticImageCover'
// For static background videos used on the site
export { default as StaticVideoCover } from './components/StaticVideoCover/StaticVideoCover'

/**
 * Non-moving assets, displaying only low quality video and image previews
 */
// For any icons - specify a constant size as opposed to dynamic
export { default as IconMedia } from './fragments/IconMedia/IconMedia'

// For thumbnails - these are all the tall, square grid tiles that are usually clickable
export { default as ThumbnailMedia } from './fragments/ThumbnailMedia/ThumbnailMedia'

// For banners - the only use is probably just club pages for now
export { default as BannerMedia } from './fragments/BannerMedia/BannerMedia'

/**
 * Non-moving assets with progress
 */
// Used to show club owners the progress of the post in the upload flow
export { default as RawThumbnailMedia } from './fragments/RawThumbnailMedia/RawThumbnailMedia'

/**
 * Moving assets
 */
// For posts but when browsing through infinite scrolling - caps the quality of the image and restricts controls
export { default as PreviewMedia } from './fragments/PreviewMedia/PreviewMedia'

// For posts when viewing the post - full controls and resolution of media
export { default as CinematicMedia } from './fragments/CinematicMedia/CinematicMedia'

/**
 * Moving assets with progress
 */
// Used to show club owners the progress of the post in the upload flow
// But on the actual post itself
// Also used for staff to see progress when in post staff view
export { default as RawCinematicMedia } from './fragments/RawCinematicMedia/RawCinematicMedia'
