import { Box, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ReactNode } from 'react'
import Button from '@//:modules/form/Button/Button'

interface Props {
  children: ReactNode
}

export default function RequiredPrompt ({ children }: Props): JSX.Element {
  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <Button size='sm' variant='ghost' color='gray.200'>
            <Trans>Why is this required?</Trans>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody fontSize='sm'>
            {children}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
