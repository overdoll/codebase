import { FlexProps } from '@chakra-ui/react'
import { IPlayerOptions } from 'xgplayer'

export const VIDEO_OPTIONS: Omit<IPlayerOptions, 'url'> = {
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
  hideStartBtn: true,
  keyShortcut: 'off',
  closeFocusVideoFocus: true,
  closePlayVideoFocus: true,
  closeControlsBlur: true

}

export const CONTROLS_CONTAINER = {
  bg: 'rgba(0, 0, 0, 0.5)',
  borderRadius: 'full'
}

export const COVER_PROPS: FlexProps = {
  w: '100%',
  h: '100%',
  objectFit: 'cover'
}

export const CONTAIN_PROPS: FlexProps = {
  w: '100%',
  h: '100%',
  objectFit: 'contain'
}
