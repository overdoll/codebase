import {
  Box,
  Heading,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function RequiredPrompt ({ children }: Props): JSX.Element {
  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <Heading role='button' fontSize='md' color='gray.200'>
            <Trans>Why is this required</Trans>
          </Heading>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverHeader fontWeight='semibold'>
            <Trans>Why is this required</Trans>
          </PopoverHeader>
          <PopoverBody textAlign='left' fontSize='sm'>{children}</PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
