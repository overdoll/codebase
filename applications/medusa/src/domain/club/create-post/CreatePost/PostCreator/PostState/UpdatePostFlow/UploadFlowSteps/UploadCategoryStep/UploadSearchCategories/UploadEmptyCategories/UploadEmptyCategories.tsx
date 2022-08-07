import { HintProp } from '@//:modules/content/Placeholder/Empty/EmptyBackground/EmptyBackground'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

export default function UploadEmptyCategories ({ hint }: HintProp): JSX.Element {
  return (
    <LargeBackgroundBox>
      <Stack spacing={2}>
        <Heading fontSize='lg' color='gray.200'>
          <Trans>
            No categories were found with the title {hint as string}
          </Trans>
        </Heading>
      </Stack>
    </LargeBackgroundBox>
  )
}
