/**
 * @flow
 */
import type { Node } from 'react'
import Button from '@//:modules/form/Button'
import { useTranslation } from 'react-i18next'
import Link from '@//:modules/routing/Link'

type Props = {};

export default function CommunityGuidelines ({ ...rest }: Props): Node {
  const [t] = useTranslation('general')

  return (
    <Link to='#'>
      <Button size='sm' colorScheme='blue' variant='link' {...rest}>{t('button.guidelines')}</Button>
    </Link>
  )
}
