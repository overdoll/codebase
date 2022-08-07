import { Box, ButtonProps, Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import ContactInformation from './ContactInformation/ContactInformation'

interface Props extends ButtonProps {

}

export default function ContactButton (props: Props): JSX.Element {
  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <Button size='md' {...props}>
            <Trans>
              Contact Us
            </Trans>
          </Button>
        </PopoverTrigger>
        <PopoverContent p={4}>
          <ContactInformation />
        </PopoverContent>
      </Popover>
    </Box>
  )
}
