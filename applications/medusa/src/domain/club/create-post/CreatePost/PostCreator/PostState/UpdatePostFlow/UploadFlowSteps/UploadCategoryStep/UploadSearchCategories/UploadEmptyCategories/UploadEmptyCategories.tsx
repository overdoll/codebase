import { Trans } from '@lingui/react'
import { HintProp } from '@//:modules/content/Placeholder/Empty/EmptyBackground/EmptyBackground'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Heading, Stack } from '@chakra-ui/react'

export default function UploadEmptyCategories ({ hint }: HintProp): JSX.Element {
  const emptyMessage = (
    <Trans
      id='message.placeholder.empty.categories.upload.one'
      message='No categories were found'
      values={{}}
      components={{}}
    />
  )

  const fullMessage = (
    <Trans
      id='message.placeholder.empty.categories.upload.other'
      values={{ hint: hint }}
      message={`No categories were found with the title ${hint as string}`}
      components={{}}
    />
  )

  return (
    <LargeBackgroundBox>
      <Stack spacing={2}>
        <Heading fontSize='lg' color='gray.200'>
          {(hint == null || hint === '') ? emptyMessage : fullMessage}
        </Heading>
      </Stack>
    </LargeBackgroundBox>
  )
}
