import { useState } from 'react'
import { useClipboard } from '@chakra-ui/react'
import { t } from '@lingui/macro'
import { useToast } from '../content/ThemeComponents'

interface Props {
  text: string
  response?: string
}

export default function useCopyToClipboardWrapper ({
  text,
  response
}: Props): [boolean, () => void] {
  const [copied] = useState(text)

  const {
    hasCopied,
    onCopy
  } = useClipboard(copied)

  const notify = useToast({})

  const onClickButton = (): void => {
    onCopy()
    notify({
      title: response ?? t`Copied to clipboard!`,
      status: 'info',
      duration: 2000
    })
  }

  return [hasCopied, onClickButton]
}
