import { PageWrapper } from '@//:modules/content/PageLayout'
import { Trans } from '@lingui/macro'
import { Heading, Stack } from '@chakra-ui/react'
import { PageProps } from '@//:types/app'
import ContactInformation from '../../../common/components/Contact/ContactInformation/ContactInformation'
import Head from 'next/head'
import DefaultRichObject from '../../../common/rich-objects/default/DefaultRichObject/DefaultRichObject'
import React from 'react'

const Feedback: PageProps<{}> = () => {
  const TITLE = 'Feedback - overdoll'

  return (
    <>
      <Head>
        <title>
          {TITLE}
        </title>
        <meta
          property='og:title'
          content={TITLE}
        />
      </Head>
      <DefaultRichObject />
      <PageWrapper>
        <Stack spacing={4}>
          <Heading color='gray.00' fontSize='lg'>
            <Trans>
              If you would like to contact us or have any feedback, feel free to send us a note through one of the
              following methods.
            </Trans>
          </Heading>
          <ContactInformation />
        </Stack>
      </PageWrapper>
    </>
  )
}

export default Feedback
