/**
 * @flow
 */
import type { Node } from 'react'
import {
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton, PopoverBody, Popover, PopoverHeader, Box, Heading
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

type Props = {
  children: string,
};

export default function RequiredPrompt ({ children }: Props): Node {
  const [t] = useTranslation('manage')

  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <Heading role='button' fontSize='md' color='gray.200'>{t('posts.flow.steps.footer.required')}</Heading>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverCloseButton />
          <PopoverHeader fontWeight='semibold'>{t('posts.flow.steps.footer.required')}</PopoverHeader>
          <PopoverBody textAlign='left' fontSize='sm'>{children}</PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
