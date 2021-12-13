/**
 * @flow
 */
import Button from '@//:modules/form/Button'
import { useTranslation } from 'react-i18next'
import Link from '@//:modules/routing/Link'
import { ButtonProps } from '@chakra-ui/react'

export default function CommunityGuidelines ({ ...rest }: ButtonProps): JSX.Element {
  const [t] = useTranslation('general')

  return (
    <Link to='#'>
      <Button
        size='sm'
        colorScheme='teal'
        variant='link'
        {...rest}
      >
        {t('button.guidelines')}
      </Button>
    </Link>
  )
}
