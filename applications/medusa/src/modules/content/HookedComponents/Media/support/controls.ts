export const playVideo = (player): void => {
  player.off('canplay', playVideo)
  const playPromise = player.play()
  if (playPromise !== undefined && playPromise) {
    playPromise.catch(err => {
    })
  }
}

export const startOrPlayVideo = (player): void => {
  if (!(player.root.contains(player.video))) {
    player.once('canplay', playVideo)
    player.start()
  } else {
    playVideo(player)
  }
}

export const pauseVideo = (player): void => {
  if (!player.paused) {
    player.pause()
  }
}

export const requestFullscreen = (player, container: HTMLDivElement | null, onRequestComplete: () => void): void => {
  if (container == null) return
  if (container.requestFullscreen != null) {
    const fullscreenPromise = container.requestFullscreen()
    if (fullscreenPromise != null) {
      onRequestComplete()
      fullscreenPromise.catch(() => {
        player.emit('fullscreen error')
      })
    }
  } else if (container.mozRequestFullScreen != null) {
    container.mozRequestFullScreen()
    onRequestComplete()
  } else if (container.webkitRequestFullscreen != null) {
    container.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT)
    onRequestComplete()
  } else if (player.video.webkitSupportsFullscreen != null) {
    player.video.webkitEnterFullscreen()
    onRequestComplete()
  } else if (container.msRequestFullscreen != null) {
    container.msRequestFullscreen()
    onRequestComplete()
  }
}

export const exitFullscreen = (onExitComplete: () => void): void => {
  if (document.exitFullscreen) {
    void document.exitFullscreen()
    onExitComplete()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
    onExitComplete()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
    onExitComplete()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
    onExitComplete()
  }
}

export const muteVideo = (player): void => {
  if (!player.video.muted) {
    player.video.muted = true
  }
}

export const unMuteVideo = (player): void => {
  if (player.video.muted) {
    player.video.muted = false
  }
}
