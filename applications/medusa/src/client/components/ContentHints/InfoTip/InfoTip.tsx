import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'

interface Props {
  text: string
}

export default function InfoTip ({ text }: Props): JSX.Element {
  return (
    <Popover>
      <PopoverTrigger>
        <></>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody
          textAlign='left'
          pr={6}
          fontSize='sm'
        >
          {text}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
