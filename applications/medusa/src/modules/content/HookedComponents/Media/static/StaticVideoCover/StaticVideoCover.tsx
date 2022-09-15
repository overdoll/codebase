import VideoContainer, { VideoContainerProps } from '../../components/VideoContainer/VideoContainer'

interface Props extends Omit<VideoContainerProps, 'mp4Url'> {
  mp4Url: Pick<VideoContainerProps, 'mp4Url'>['mp4Url']
}

export default function StaticVideoCover (props: Props): JSX.Element {
  const {
    poster,
    mp4Url,
    duration,
    aspectRatio
  } = props

  return (
    <VideoContainer
      volume={0}
      controls='none'
      mp4Url={mp4Url}
      muted
      autoPlay
      poster={poster}
      aspectRatio={aspectRatio}
      duration={duration}
      hasAudio={false}
    />
  )
}
