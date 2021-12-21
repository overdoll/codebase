import { useState } from 'react'
import { useClipboard, useToast } from '@chakra-ui/react'
import { t } from '@lingui/macro'

interface Props {
  text: string
}

export default function useCopyToClipboardWrapper ({ text }: Props): [boolean, () => void] {
  const [copied] = useState(text)

  const {
    hasCopied,
    onCopy
  } = useClipboard(copied)

  const notify = useToast()

  const onClickButton = (): void => {
    onCopy()
    notify({
      title: t`Copied to clipboard!`,
      duration: 1000,
      status: 'success',
      isClosable: true,
      variant: 'solid'
    })
  }

  return [hasCopied, onClickButton]
}
