/**
 * @flow
 */

import type { Node } from 'react'
import Button from '@//:modules/form/Button'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import { CopyCheck, CopyText } from '../../../../assets/icons/interface'
import { useCopyToClipboardWrapper } from '@//:modules/utilities/hooks'

type Props = {
  children: string,
}

export default function CopyToClipboardButton ({ children, ...rest }: Props): Node {
  const [t] = useTranslation('general')

  const [hasCopied, onCopy] = useCopyToClipboardWrapper(children)

  return (
    <Button
      colorScheme='gray' variant='solid'
      size='sm'
      aria-label={t('button.copy')}
      rightIcon={<Icon w={4} h={4} icon={hasCopied ? CopyCheck : CopyText} fill='gray.100' />}
      onClick={onCopy} {...rest}
    >
      {t('button.copy')}
    </Button>
  )
}
