import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { ArrowButtonRight } from '@//:assets/icons'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { ExternalLink } from '@//:modules/routing'
import Button from '@//:modules/form/Button/Button'
import trackFathomEvent from '@//:modules/support/trackFathomEvent'
import { FEEDBACK_LINK } from '@//:modules/constants/links'

interface Props {
  onClose: () => void
  onForget: () => void
}

export default function RatingToast (props: Props): JSX.Element {
  const {
    onClose,
    onForget
  } = props

  const onClickRate = (): void => {
    onClose()
    trackFathomEvent('WAXAG3AM', 0)
  }

  return (
    <Box p={3} bg='gray.900' borderRadius='lg' w='100%'>
      <Stack spacing={2}>
        <HStack w='100%' spacing={0} justify='space-between' align='flex-start'>
          <Text fontSize='sm' color='gray.00'>
            <Trans>
              Tell us what you think about overdoll!
            </Trans>
          </Text>
          <CloseButton onClick={onForget} />
        </HStack>
        <ExternalLink
          href={FEEDBACK_LINK}
        >
          <Button
            w='100%'
            onClick={onClickRate}
            rightIcon={<Icon icon={ArrowButtonRight} fill='teal.900' w={3} h={3} />}
            colorScheme='teal'
            borderRadius='full'
            size='sm'
          >
            <Trans>
              Give Feedback
            </Trans>
          </Button>
        </ExternalLink>
      </Stack>
    </Box>
  )
}
