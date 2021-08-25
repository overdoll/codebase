/**
 * @flow
 */

import type { Node } from 'react'
import { useState } from 'react'
import { useClipboard, useToast } from '@chakra-ui/react'
import Button from '@//:modules/form/Button'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceFileText
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/files-folders/interface-file-text.svg'
import InterfaceFileCheck
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/files-folders/interface-file-check.svg'

type Props = {
  text: string,
  children: string,
}

export default function CopyToClipboardText ({ text, children, ...rest }: Props): Node {
  const [t] = useTranslation('general')

  const [copied] = useState(text)

  const { hasCopied, onCopy } = useClipboard(copied)

  const notify = useToast()

  const onClickButton = () => {
    onCopy()
    notify({
      title: t('menu.copied'),
      duration: 500,
      status: 'success',
      isClosable: true,
      variant: 'solid'
    })
  }

  return (
    <Button
      overflow='hidden' textOverflow='ellipsis'
      size='md'
      leftIcon={<Icon w={3} h={3} icon={hasCopied ? InterfaceFileCheck : InterfaceFileText} fill='gray.100' />}
      colorScheme='gray' variant='link'
      onClick={onClickButton} {...rest}
    >
      {children}
    </Button>
  )
}
