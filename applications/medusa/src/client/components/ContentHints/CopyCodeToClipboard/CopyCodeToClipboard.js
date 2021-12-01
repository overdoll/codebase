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

export default function CopyCodeToClipboard ({ children, ...rest }: Props): Node {
  const [t] = useTranslation('general')

  const [hasCopied, onCopy] = useCopyToClipboardWrapper(children)

  return (
    <Button
      overflow='hidden' textOverflow='ellipsis'
      colorScheme='gray' variant='unstyled'
      aria-label={t('button.copy')}
      bg='gray.900'
      borderWidth={2}
      borderColor='gray.400'
      borderRadius='semi'
      w='100%'
      onClick={onCopy} {...rest}
    >
      <Flex justify='space-between' mx={2} align='center'>
        <Code
          whiteSpace='normal'
          wordBreak='break-word'
          fontSize='sm'
          bg='transparent'
          fontWeight='normal'
          fontStyle='mono'
          color='blue.200'
        >
          {children}
        </Code>
        <Icon ml={2} w={4} h={4} icon={hasCopied ? InterfaceFileCheck : InterfaceFileText} fill='gray.400' />
      </Flex>
    </Button>
  )
}
