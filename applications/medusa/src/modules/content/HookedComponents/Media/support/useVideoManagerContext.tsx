import { useContext } from 'react'
import { VideoManagerContext, VideoManagerContextType } from '../components/VideoManagerProvider/VideoManagerProvider'

export default function useVideoManagerContext (): VideoManagerContextType {
  return useContext(VideoManagerContext)
}
