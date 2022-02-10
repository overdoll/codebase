import Button from '@//:modules/form/Button/Button'
import Icon from '@//:modules/content/PageLayout/Flair/Icon/Icon'
import { CopyCheck, CopyText } from '@//:assets/icons/interface'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { Trans } from '@lingui/macro'
import { HTMLChakraProps } from '@chakra-ui/react'

interface Props extends HTMLChakraProps<any> {
  children: string
}

export default function CopyToClipboardButton ({
  children,
  ...rest
}: Props): JSX.Element {
  const [hasCopied, onCopy] = useCopyToClipboardWrapper({ text: children })

  return (
    <Button
      colorScheme='gray'
      variant='solid'
      size='sm'
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
      <Trans>Copy</Trans>
    </Button>
  )
}
