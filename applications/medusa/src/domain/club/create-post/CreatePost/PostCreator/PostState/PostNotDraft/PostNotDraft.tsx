import { Box, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import Icon from '../../../../../../../modules/content/PageLayout/Flair/Icon/Icon'
import { PauseCircle } from '@//:assets/icons'
import Button from '@//:modules/form/Button/Button'
import { PostPlaceholder } from '@//:modules/content/PageLayout'
import { useRouter } from 'next/router'

export default function PostNotDraft (): JSX.Element {
  const router = useRouter()

  return (
    <PostPlaceholder>
      <Stack spacing={4} align='center'>
        <Icon
          w={12}
          h={12}
          icon={PauseCircle}
          fill='orange.300'
        />
        <Box>
          <Heading color='gray.00' fontSize='4xl'>
            <Trans>
              This post was already submitted
            </Trans>
          </Heading>
        </Box>
        <Button
          colorScheme='orange'
          variant='solid'
          size='lg'
          onClick={() => router.back()}
        >
          <Trans>
            Go back
          </Trans>
        </Button>
      </Stack>
    </PostPlaceholder>
  )
}
