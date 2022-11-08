import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import { OverdollLogoOutline } from '@//:assets/logos'
import { Trans } from '@lingui/macro'
import EmptyJoinForm from './EmptyJoinForm/EmptyJoinForm'
import useEmptyJoinForm from '../support/useEmptyJoinForm'
import { useState } from 'react'
import Button from '@//:modules/form/Button/Button'

export default function EmptyJoin (): JSX.Element {
  const {
    onSubmit,
    isInFlight
  } = useEmptyJoinForm({})

  const [isLogin, setIsLogin] = useState(false)

  // Ask user to authenticate
  return (
    <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
      <Stack w='100%' spacing={4}>
        <Icon
          icon={OverdollLogoOutline}
          w={16}
          h={16}
          fill='gray.00'
        />
        <Heading fontSize='4xl' color='gray.00'>
          {isLogin
            ? (
              <Trans>
                Sign in to overdoll
              </Trans>
              )
            : (
              <Trans>
                Join overdoll
              </Trans>
              )}
        </Heading>
      </Stack>
      <EmptyJoinForm
        onSubmit={({ email }) => onSubmit(email)}
        isLoading={isInFlight}
      />
      <HStack spacing={2}>
        <Text fontSize='sm' color='gray.200'>
          {isLogin
            ? (
              <Trans>
                Don't have an account?
              </Trans>
              )
            : (
              <Trans>
                Have an account already?
              </Trans>
              )}
        </Text>
        <Button onClick={() => setIsLogin(x => !x)} variant='link' size='sm' colorScheme='primary'>
          {isLogin
            ? (
              <Trans>
                Sign up
              </Trans>
              )
            : (
              <Trans>
                Log in
              </Trans>
              )}
        </Button>
      </HStack>
    </Stack>
  )
}
