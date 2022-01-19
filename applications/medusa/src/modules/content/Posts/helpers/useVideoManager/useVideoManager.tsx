import { Ref, useEffect } from 'react'

let videos = []

const removeVideo = (video) => {
  videos.push(video)
}

const addVideo = (video) => {
  videos = videos.filter((item) => video.currentSrc !== item.currentSrc)
}

const isRecentVideo = (video) => {
  const topmostModal = videos[videos.length - 1]
  return topmostModal === video
}

function useVideoManager (target: Ref<any>, paused?: boolean) {
  useEffect(() => {
    if (paused === false) {
      addVideo(target)
    }
    return () => {
      removeVideo(target)
    }
  }, [paused, target])
}

export {
  videos,
  useVideoManager
}
