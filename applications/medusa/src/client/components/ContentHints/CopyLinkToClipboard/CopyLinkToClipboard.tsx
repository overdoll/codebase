import { ButtonProps, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'

interface Props extends ButtonProps {
  children: string
}

export default function CopyLinkToClipboard ({
  children,
  ...rest
}: Props): JSX.Element {
  const [hasCopied, onCopy] = useCopyToClipboardWrapper({ text: children })

  return (
    <InputGroup>
      <Input color='gray.200' size='md' isDisabled value={children} />
      <InputRightElement w='100%'>
        <Flex w='100%' justify='flex-end'>
          <Button mr={2} px={2} onClick={onCopy} h={6} size='sm'>
            {hasCopied ? <Trans>Copied!</Trans> : <Trans>Copy</Trans>}
          </Button>
        </Flex>
      </InputRightElement>
    </InputGroup>

  )
}
