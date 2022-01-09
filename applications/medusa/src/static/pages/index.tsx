import { ReactNode } from 'react'
import Head from 'next/head'

export default function Home (): ReactNode {
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
        <title>overdoll</title>
      </Head>
      hello
    </div>
  )
}
