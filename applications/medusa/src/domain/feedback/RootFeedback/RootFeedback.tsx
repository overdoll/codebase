import { GameContainer } from '@//:modules/content/PageLayout'
import { PageProps } from '@//:types/app'
import Head from 'next/head'
import Feedback from './Feedback/Feedback'

const RootFeedback: PageProps<{}> = () => {
  return (
    <>
      <Head>
        <title>
          Feedback - overdoll
        </title>
      </Head>
      <GameContainer>
        <Feedback />
      </GameContainer>
    </>
  )
}

export default RootFeedback
