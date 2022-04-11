import { ButtonProps, Code, Flex } from '@chakra-ui/react'
import Icon from '../../PageLayout/Flair/Icon/Icon'
import { CopyCheck, CopyText } from '@//:assets/icons/interface'
import { useCopyToClipboardWrapper } from '../../../hooks'
import { ClickableBox } from '../../PageLayout'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

interface Props extends ButtonProps {
  children: string
}

export default function CopyCodeToClipboard ({
  children,
  ...rest
}: Props): JSX.Element {
  const { i18n } = useLingui()

  const [hasCopied, onCopy] = useCopyToClipboardWrapper({ text: children })

  return (
    <ClickableBox
      aria-label={i18n._(t`Copy`)}
      onClick={onCopy}
      bg='gray.900'
      {...rest}
    >
      <Flex
        justify='space-between'
        align='center'
      >
        <Code
          whiteSpace='normal'
          wordBreak='break-word'
          fontSize='sm'
          bg='transparent'
          fontWeight='normal'
          fontStyle='mono'
          color='gray.100'
          p={0}
        >
          {children}
        </Code>
        <Icon
          ml={2}
          w={4}
          h={4}
          icon={hasCopied ? CopyCheck : CopyText}
          fill='gray.500'
        />
      </Flex>
    </ClickableBox>
  )
}
