import { ReactNode } from 'react'
import Head from 'next/head'
import PrivacyPolicy from './PrivacyPolicy/PrivacyPolicy'

interface Props {
  content: string
}

export default function Home ({ content }: Props): ReactNode {
  return (
    <div>
      <Head>
        <link rel='preload' as='style' href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600' />
        <link rel='preload' as='style' href='https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600;700;800' />
        <link rel='preload' as='style' href='https://fonts.googleapis.com/css?family=Source+Code+Pro:400' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600' rel='stylesheet' type='text/css' />
        <link
          href='https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600;700;800'
          rel='stylesheet'
          type='text/css'
        />
        <link href='https://fonts.googleapis.com/css?family=Source+Code+Pro:400' rel='stylesheet' type='text/css' />
        <title>Privacy Policy / overdoll</title>
      </Head>
      <PrivacyPolicy content={content} />
    </div>
  )
}

export async function getStaticProps (): Promise<{ props: Props }> {
  const content = await require('./PrivacyPolicy/content/privacy-policy.md')

  return {
    props: {
      content: content.default
    }
  }
}
