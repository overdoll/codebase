import Icon from '@//:modules/content/Icon/Icon'
import { useTranslation } from 'react-i18next'
import { BadgeCircle } from '../../../../assets/icons/navigation'
import { Center, Heading, Stack } from '@chakra-ui/react'
import Button from '@//:modules/form/Button'
import { Helmet } from 'react-helmet-async'
import { PageWrapper } from '@//:modules/content/PageLayout'
import Link from '@//:modules/routing/Link'

export default function NotFound (): JSX.Element {
  const [t] = useTranslation('empty')

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
          {t('empty.header')}
        </Heading>
        <Center mt={8}>
          <Stack
            direction={['column', 'row']}
            spacing='24px'
          >
            <Button
              size='lg'
              onClick={() => {
                history.back()
              }}
            >
              {t('empty.leave')}
            </Button>
            <Link to='/'>
              <Button
                size='lg'
                colorScheme='primary'
              >
                {t('empty.home')}
              </Button>
            </Link>
          </Stack>
        </Center>
      </PageWrapper>
    </>
  )
}
