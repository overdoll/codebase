import {
  Box,
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

export default function ClubOwnerJoinWrapper ({ children }: Props): JSX.Element {
  return (
    <Box w='100%'>
      <Popover>
        <PopoverTrigger>
          {children}
        </PopoverTrigger>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverHeader fontWeight='semibold'>
            <Trans>You are the owner</Trans>
          </PopoverHeader>
          <PopoverBody textAlign='left' fontSize='sm'>Because you are the owner of the club, you are already a member
            and cannot join nor leave the club.
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
