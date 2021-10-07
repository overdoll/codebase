/**
 * @flow
 */
import { Heading, Text } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import type { Node } from 'react'
import Icon from '@//:modules/content/Icon/Icon'
import SignBadgeCircle
  from '@streamlinehq/streamlinehq/img/streamline-regular/maps-navigation/sign-shapes/sign-badge-circle.svg'
import { useTranslation } from 'react-i18next'
import { PageWrapper } from '../../../components/PageLayout'

type Props = {
  error: Error
}

// This component displays an error page when an error occurs on the server
// TODO: make this page look nice, since users may sometimes see this during downtime or crashes
// TODO: also need to report the error to sentry
export default function ErrorDisplay ({ error }: Props): Node {
  const [t] = useTranslation('error')

  const debug = process.env.APP_DEBUG === 'true'

  if (debug) console.log(error)

  return (
    <>
      <Helmet title='error' />
      <PageWrapper>
        <Icon
          icon={SignBadgeCircle}
          color='primary.500'
          w={100}
          h={100}
          ml='auto'
          mr='auto'
          mb={8}
        />
        <Heading size='md' align='center' color='gray.00'>
          {t('page.header')}
        </Heading>
        <Text size='md' align='center' color='gray.200'>
          {t('page.subheader')}
        </Text>
      </PageWrapper>
    </>
  )
}
