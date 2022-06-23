import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Dispatch, SetStateAction } from 'react'
import Switch from '@//:modules/form/Switch/Switch'
import { Alert, AlertDescription, AlertIcon } from '@//:modules/content/ThemeComponents'

interface Props {
  agree: boolean
  setAgree: Dispatch<SetStateAction<boolean>>
}

export default function AgreementPayoutMethod ({
  agree,
  setAgree
}: Props): JSX.Element {
  const onChange = (e): void => {
    setAgree(e.target.checked)
  }

  return (
    <Stack spacing={4}>
      <Alert status='warning'>
        <AlertIcon />
        <AlertDescription>
          <Trans>
            Please read the following important information carefully
          </Trans>
        </AlertDescription>
      </Alert>
      <Box>
        <Heading fontSize='xl' color='gray.00'>
          <Trans>
            Platform Agreement
          </Trans>
        </Heading>
        <Stack spacing={4}>
          <Text color='gray.100' fontSize='sm'>
            <Trans>
              The overdoll platform works with many providers to make it possible to exist. This means that along with
              you being
              subject to our guidelines, you are also subject to the ones imposed upon us.
            </Trans>
          </Text>
          <Stack spacing={2}>
            <Text color='gray.100' fontSize='sm'>
              <Trans>
                In order to receive payments on the platform (and maintain your ability to do so), you must...
              </Trans>
            </Text>
            <Stack pl={2} spacing={1}>
              <Text color='gray.100' fontSize='sm'>
                <Trans>
                  Never post any content that contains real human beings
                </Trans>
              </Text>
              <Text color='gray.100' fontSize='sm'>
                <Trans>
                  Post at least one new piece of exclusive supporter content every 30 days
                </Trans>
              </Text>
            </Stack>
          </Stack>
          <Text color='gray.100' fontSize='sm'>
            <Trans>
              You will never lose the ability to receive payouts. You will permanently lose the ability to collect
              subscription payments if you violate the guidelines above.
            </Trans>
          </Text>
        </Stack>
      </Box>
      <HStack spacing={4}>
        <Switch
          size='md'
          onChange={onChange}
          colorScheme='green'
          defaultChecked={agree}
        />
        <Heading fontSize='sm' color='gray.00'>
          <Trans>
            I fully understand the information provided to me above and will do my best to follow it
          </Trans>
        </Heading>
      </HStack>
    </Stack>
  )
}
