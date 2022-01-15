import { Box, Flex, Grid, HTMLChakraProps, Spinner } from '@chakra-ui/react'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ControlledVideoFragment$key } from '@//:artifacts/ControlledVideoFragment.graphql'
import { useEffect, useRef, useState } from 'react'
import PlayPauseButton from './components/PlayPauseButton/PlayPauseButton'
import SimpleProgressCircle from './components/SimpleProgressCircle/SimpleProgressCircle'

interface Props extends HTMLChakraProps<any> {
  query: ControlledVideoFragment$key
  muted?: boolean
}

const Fragment = graphql`
  fragment ControlledVideoFragment on Resource {
    urls {
      url
      mimeType
    }
  }
`

export default function ControlledVideo ({
  query,
  muted = true,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const ref = useRef<HTMLVideoElement | null>(null)

  const [time, setTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [loaded, isLoaded] = useState(false)

  const onChangeVideo = (): void => {
    const video = ref.current
    if (video == null) return
    if (video.paused) {
      void video.play()
      return
    }
    video.pause()
  }

  useEffect(() => {

  }, [ref?.current])

  const updateTime = (time): void => {
    setTime(time / ref?.current?.duration ?? 1)
  }

  return (
    <Box position='relative'>
      <Box
        as='video'
        ref={ref}
        disablePictureInPicture
        muted={muted}
        onTimeUpdate={(e) => updateTime(e.target.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedData={() => isLoaded(true)}
        loop
        preload='auto'
        {...rest}
      >
        {data.urls.map((item, index) => (
          <source
            key={index}
            src={item.url}
            type={item.mimeType}
          />)
        )}
      </Box>
      <Grid top={0} position='absolute' m={1} w='100%' h='100%'>
        <Flex>
          <SimpleProgressCircle isLoading={false} time={time} />
        </Flex>
        <Box>
          <Spinner />
        </Box>
        <Box position='absolute' bottom={0} right={0} left={0}>
          <PlayPauseButton isPaused />
        </Box>
      </Grid>

    </Box>
  )
}
