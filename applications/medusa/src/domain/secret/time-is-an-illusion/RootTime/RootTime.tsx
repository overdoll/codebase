import { GameContainer } from '@//:modules/content/PageLayout'
import { PageProps } from '@//:types/app'
import Time from './Time/Time'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'

const RootTime: PageProps<{}> = () => {
  return (
    <>
      <Head>
        <title>
          ...
        </title>
      </Head>
      <Box w='100%' h='100%' bg='#000' position='fixed' />
      <GameContainer>
        <Time />
      </GameContainer>
    </>
  )
}

export default RootTime
