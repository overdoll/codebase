import { Box, Flex, Heading, HTMLChakraProps, Spinner, Stack, Text } from '@chakra-ui/react'
import Icon from '../../../../../../../PageLayout/Flair/Icon/Icon'
import { ControlPlayButton, WarningTriangle } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'
import Button from '../../../../../../../../form/Button/Button'

interface Props extends HTMLChakraProps<any> {
  isLoading: boolean
  hasError: boolean
  onRetry: () => void
  canControl?: boolean | undefined
  isPaused: boolean
  onPlay: () => void
}

export default function LoadingSpinner (props: Props): JSX.Element {
  const {
    isLoading,
    hasError,
    onRetry,
    canControl,
    isPaused,
    onPlay
  } = props

  if (hasError && !isLoading) {
    return (
      <Stack
        pointerEvents='auto'
        borderRadius='md'
        p={4}
        bg='dimmers.500'
        direction='column'
        justify='center'
        align='center'
        spacing={2}
      >
        <Icon icon={WarningTriangle} w={6} h={6} fill='orange.300' />
        <Heading fontSize='md' color='orange.300'>
          <Trans>
            Error Loading Video
          </Trans>
        </Heading>
        {canControl !== false
          ? (
            <Button w='100%' onClick={onRetry} size='md' colorScheme='orange'>
              <Trans>
                Retry
              </Trans>
            </Button>
            )
          : (
            <Text textAlign='center' fontSize='xs' color='orange.100'>
              <Trans>
                Try refreshing the page to fix the error
              </Trans>
            </Text>
            )}
      </Stack>
    )
  }

  if (!isLoading && isPaused) {
    return (
      <Box pointerEvents='auto' onClick={onPlay} cursor='pointer' w={16} h={16}>
        <Icon icon={ControlPlayButton} fill='whiteAlpha.800' />
      </Box>
    )
  }

  if (!isLoading) {
    return <></>
  }

  return (
    <Flex pointerEvents='auto' borderRadius='full' p={2} bg='dimmers.500'>
      <Spinner
        boxShadow='lg'
        thickness='3px'
        speed='0.65s'
        emptyColor='transparent'
        color='gray.00'
        size='lg'
      />
    </Flex>
  )
}
