import { Box, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import ContactInformation from './ContactInformation/ContactInformation'

export default function ContactButton (): JSX.Element {
  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <Button size='md'>
            <Trans>
              Contact Us
            </Trans>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <ContactInformation />
        </PopoverContent>
      </Popover>
    </Box>
  )
}
