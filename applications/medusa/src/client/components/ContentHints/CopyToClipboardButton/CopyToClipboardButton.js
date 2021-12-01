/**
 * @flow
 */

import type { Node } from 'react'
import { useState } from 'react'
import { useClipboard, useToast, Box, Text, Flex, Code } from '@chakra-ui/react'
import Button from '@//:modules/form/Button'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import InterfaceFileText
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/files-folders/interface-file-text.svg'
import InterfaceFileCheck
  from '@streamlinehq/streamlinehq/img/streamline-mini-bold/interface-essential/files-folders/interface-file-check.svg'
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
      rightIcon={<Icon w={4} h={4} icon={hasCopied ? InterfaceFileCheck : InterfaceFileText} fill='gray.100' />}
      onClick={onCopy} {...rest}
    >
      {t('button.copy')}
    </Button>
  )
}
