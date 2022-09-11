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
