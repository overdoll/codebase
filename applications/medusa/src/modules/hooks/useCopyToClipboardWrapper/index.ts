import { useState } from 'react'
import { useClipboard } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useToast } from '../../content/ThemeComponents'

interface Props {
  text: string
}

export default function useCopyToClipboardWrapper ({ text }: Props): [boolean, () => void] {
  const [copied] = useState(text)

  const {
    hasCopied,
    onCopy
  } = useClipboard(copied)

  const notify = useToast({})

  const onClickButton = (): void => {
    onCopy()
    notify({
      title: t`Copied to clipboard!`,
      status: 'info',
      duration: null
    })
  }

  return [hasCopied, onClickButton]
}
