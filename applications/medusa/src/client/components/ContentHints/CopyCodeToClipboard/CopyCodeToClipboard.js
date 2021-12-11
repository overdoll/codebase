/**
 * @flow
 */

import type { Node } from 'react'
import { Flex, Code } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Icon from '@//:modules/content/Icon/Icon'
import { CopyCheck, CopyText } from '../../../../assets/icons/interface'
import { useCopyToClipboardWrapper } from '@//:modules/utilities/hooks'
import { ClickableBox } from '@//:modules/content/PageLayout'

type Props = {
  children: string,
}

export default function CopyCodeToClipboard ({ children, ...rest }: Props): Node {
  const [t] = useTranslation('general')

  const [hasCopied, onCopy] = useCopyToClipboardWrapper(children)

  return (
    <ClickableBox
      aria-label={t('button.copy')}
      onClick={onCopy}
      borderWidth={2}
      borderColor='gray.400'
      {...rest}
    >
      <Flex justify='space-between' align='center'>
        <Code
          whiteSpace='normal'
          wordBreak='break-word'
          fontSize='sm'
          bg='transparent'
          fontWeight='normal'
          fontStyle='mono'
          color='teal.300'
          p={0}
        >
          {children}
        </Code>
        <Icon ml={2} w={4} h={4} icon={hasCopied ? CopyCheck : CopyText} fill='teal.50' />
      </Flex>
    </ClickableBox>
  )
}
