import { Button } from '@chakra-ui/react'
import Link from '@//:modules/routing/Link'
import { useTranslation } from 'react-i18next'

interface Props {
  invisible?: boolean
}

export default function SiteLinkLogo ({ invisible = false }: Props): JSX.Element {
  const [t] = useTranslation('navigation')

  return (
    <Link to='/'>
      {invisible
        ? t('title')
        : (
          <Button
            textColor='primary.500'
            fontWeight='bold'
            fontFamily='heading'
            variant='link'
            colorScheme='primary'
            width='100%'
          >
            {t('title')}
          </Button>
          )}
    </Link>
  )
}
