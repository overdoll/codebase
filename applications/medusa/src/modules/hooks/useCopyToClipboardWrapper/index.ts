import { useState } from 'react'
import { useClipboard, useToast } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface Props {
  text: string
}

export default function useCopyToClipboardWrapper ({ text }: Props): [boolean, () => void] {
  const [t] = useTranslation('general')

  const [copied] = useState(text)

  const {
    hasCopied,
    onCopy
  } = useClipboard(copied)

  const notify = useToast()

  const onClickButton = (): void => {
    onCopy()
    notify({
      title: t('menu.copied'),
      duration: 1000,
      status: 'success',
      isClosable: true,
      variant: 'solid'
    })
  }

  return [hasCopied, onClickButton]
}