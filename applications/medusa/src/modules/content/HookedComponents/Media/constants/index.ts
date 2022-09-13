import { FlexProps } from '@chakra-ui/react'

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
  noLog: true
}

export const CONTROLS_CONTAINER = {
  bg: 'dimmers.300',
  borderRadius: 'full',
  backdropFilter: 'auto',
  backdropBlur: '1px',
  boxShadow: 'lg'
}

export const COVER_PROPS: FlexProps = {
  w: '100%',
  h: '100%',
  objectFit: 'cover'
}

export const CONTAIN_PROPS: FlexProps = {
  maxWidth: '100%',
  h: 'auto',
  objectFit: 'contain'
}
