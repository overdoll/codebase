/**
 * @flow
 */
import { Heading, Text } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import Icon from '@//:modules/content/Icon/Icon'
import { BadgeCircle } from '../../../../assets/icons/navigation'
import { useTranslation } from 'react-i18next'
import { PageWrapper } from '@//:modules/content/PageLayout'

interface Props {
  error: Error
}

// This component displays an error page when an error occurs on the server
// TODO: make this page look nice, since users may sometimes see this during downtime or crashes
// TODO: also need to report the error to sentry
export default function ErrorDisplay ({ error }: Props): JSX.Element {
  const [t] = useTranslation('error')

  const debug = process.env.APP_DEBUG === 'true'

  if (debug) console.log(error)

  return (
    <>
      <Helmet title='error' />
      <PageWrapper>
        <Icon
          icon={BadgeCircle}
          fill='primary.500'
          w={100}
          h={100}
          ml='auto'
          mr='auto'
          mb={8}
        />
        <Heading
          size='md'
          align='center'
          color='gray.00'
        >
          {t('page.header')}
        </Heading>
        <Text
          size='md'
          align='center'
          color='gray.200'
        >
          {t('page.subheader')}
        </Text>
      </PageWrapper>
    </>
  )
}
