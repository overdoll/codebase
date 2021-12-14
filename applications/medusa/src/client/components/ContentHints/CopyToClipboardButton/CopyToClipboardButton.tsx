import Button from '@//:modules/form/Button/Button'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import { CopyCheck, CopyText } from '@//:assets/icons/interface'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'

interface Props {
  children: string
}

export default function CopyToClipboardButton ({
  children,
  ...rest
}: Props): JSX.Element {
  const [t] = useTranslation('general')

  const [hasCopied, onCopy] = useCopyToClipboardWrapper({ text: children })

  return (
    <Button
      colorScheme='gray'
      variant='solid'
      size='sm'
      aria-label={t('button.copy')}
      rightIcon={(
        <Icon
          w={4}
          h={4}
          icon={hasCopied ? CopyCheck : CopyText}
          fill='gray.100'
        />)}
      onClick={onCopy}
      {...rest}
    >
      {t('button.copy')}
    </Button>
  )
}
