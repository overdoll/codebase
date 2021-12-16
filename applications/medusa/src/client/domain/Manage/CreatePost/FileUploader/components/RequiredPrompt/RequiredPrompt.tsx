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
import { useTranslation } from 'react-i18next'

interface Props {
  children: string
}

export default function RequiredPrompt ({ children }: Props): JSX.Element {
  const [t] = useTranslation('manage')

  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <Heading role='button' fontSize='md' color='gray.200'>{t('create_post.flow.steps.footer.required')}</Heading>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverHeader fontWeight='semibold'>{t('create_post.flow.steps.footer.required')}</PopoverHeader>
          <PopoverBody textAlign='left' fontSize='sm'>{children}</PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
