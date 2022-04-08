import { Flex, Heading, HTMLChakraProps, Spinner, Stack } from '@chakra-ui/react'
import Icon from '../../../../../../../PageLayout/Flair/Icon/Icon'
import { WarningTriangle } from '@//:assets/icons/interface'
import { Trans } from '@lingui/macro'
import Button from '../../../../../../../../form/Button/Button'

interface Props extends HTMLChakraProps<any> {
  isLoading: boolean
  hasError: boolean
  onRetry: () => void
}

export default function LoadingSpinner ({
  isLoading,
  hasError,
  onRetry
}: Props): JSX.Element {
  if (hasError) {
    return (
      <Stack borderRadius='md' p={4} bg='dimmers.500' direction='column' justify='center' align='center' spacing={2}>
        <Icon icon={WarningTriangle} w={6} h={6} fill='orange.300' />
        <Heading fontSize='md' color='orange.300'>
          <Trans>
            Error Loading Video
          </Trans>
        </Heading>
        <Button w='100%' onClick={onRetry} size='md' colorScheme='orange'>
          <Trans>
            Retry
          </Trans>
        </Button>
      </Stack>
    )
  }

  if (!isLoading) return <></>

  return (
    <Flex borderRadius='full' p={2} bg='dimmers.500'>
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
