export const VIDEO_OPTIONS = {
  controlsList: ['nodownload', 'noremoteplayback'],
  controls: false,
  airplay: false,
  ignores: ['danmu', 'enter', 'download', 'errorRetry', 'time', 'localPreview', 'logger', 'memoryPlay', 'pip', 'playNext', 'reload', 'rotate', 'screenShot', 'definition', 'error', 'fullscreen', 'i18n', 'loading', 'mobile', 'pc', 'play', 'playbackRate', 'poster', 'progress', 'replay', 'start', 'volume'],
  playsinline: true,
  fluid: true,
  videoStyle: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block'
  },
  loop: true,
  volume: 0.1
}

export const CONTROLS_CONTAINER = {
  bg: 'dimmers.300',
  borderRadius: 'full',
  backdropFilter: 'auto',
  backdropBlur: '1px'
}
