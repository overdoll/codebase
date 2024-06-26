import { PlayerType } from '../types'
import { UseSnifferReturn } from '../../../../hooks/useSniffer'

export const playVideo = (player: PlayerType, emitScrollPlay?: boolean): void => {
  player.off('canplay', playVideo)
  const playPromise = player.play()
  if (playPromise != null) {
    playPromise.then((e) => {
      if (emitScrollPlay === true) {
        player.emit('scroll-play', e)
      }
    }).catch(e => {
      player.video.muted = true
      player.emit('autoplay-failure', e)
    })
  }
}

export const startOrPlayVideo = (player: PlayerType, emitScrollPlay?: boolean): void => {
  if (player.video == null) return
  if (!(player.root.contains(player.video))) {
    player.once('canplay', playVideo)
    player.start()
  } else {
    playVideo(player, emitScrollPlay)
  }
}

export const pauseVideo = (player: PlayerType): void => {
  if (player.video == null) return
  if (!player.video.paused) {
    player.pause()
  }
}

export const requestFullscreen = (player: PlayerType, container: HTMLElement | null): void => {
  if (container == null) return
  if (player.video == null) return

  if (container.requestFullscreen != null) {
    const fullscreenPromise = container.requestFullscreen()
    if (fullscreenPromise != null) {
      fullscreenPromise.catch(() => {
        player.emit('fullscreen error')
      })
    }
  } else if (container.mozRequestFullScreen != null) {
    container.mozRequestFullScreen().catch(() => {
      player.emit('fullscreen error')
    })
  } else if (container?.webkitRequestFullscreen != null) {
    // @ts-expect-error
    container?.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT).catch(() => {
      player.emit('fullscreen error')
    })
  } else if (player.video.webkitSupportsFullscreen != null) {
    player.video.webkitEnterFullscreen()
  } else if (container.msRequestFullscreen != null) {
    container.msRequestFullscreen().catch(() => {
      player.emit('fullscreen error')
    })
  }
}

export const exitFullscreen = (player): void => {
  if (document.exitFullscreen != null) {
    document.exitFullscreen().catch(() => {
      player.emit('fullscreen error')
    })
  } else if (document.webkitExitFullscreen != null) {
    document.webkitExitFullscreen().catch(() => {
      player.emit('fullscreen error')
    })
  } else if (document.mozCancelFullScreen != null) {
    document.mozCancelFullScreen().catch(() => {
      player.emit('fullscreen error')
    })
  } else if (document.msExitFullscreen != null) {
    document.msExitFullscreen().catch(() => {
      player.emit('fullscreen error')
    })
  }
}

export const muteVideo = (player: PlayerType, device: UseSnifferReturn['device']): void => {
  if (player.video == null) return
  if (!player.video.muted) {
    if (device === 'mobile') {
      player.video.muted = true
      player.video.volume = 0
    } else {
      player.video.muted = true
    }
  }
}

export const unMuteVideo = (player: PlayerType, device: UseSnifferReturn['device']): void => {
  if (player.video == null) return
  if (player.video.muted) {
    if (device === 'mobile') {
      player.video.muted = false
      player.video.volume = 1
    } else {
      player.video.muted = false
    }
  }
}

export const requestPlayAfterSeeking = (player): void => {
  player.once('seeked', (player) => {
    player.once('canplay', () => {
      playVideo(player)
    })
  })
}

export const fastForwardVideo = (value: number, duration: number, player: PlayerType): void => {
  if (player.video == null) return
  if (player.currentTime + value >= duration) {
    player.currentTime = duration
  } else {
    player.currentTime = player.currentTime + value
  }
  requestPlayAfterSeeking(player)
}

export const goBackwardVideo = (value: number, duration: number, player: PlayerType): void => {
  if (player.video == null) return
  if (player.currentTime - value <= 0) {
    player.currentTime = 0
  } else {
    player.currentTime = player.currentTime - value
  }
  requestPlayAfterSeeking(player)
}
