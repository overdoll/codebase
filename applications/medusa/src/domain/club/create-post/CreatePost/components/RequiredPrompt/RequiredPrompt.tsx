import { Box, Heading, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react'
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
          <PopoverBody>
            <Text color='gray.00' fontSize='sm'>
              {children}
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
