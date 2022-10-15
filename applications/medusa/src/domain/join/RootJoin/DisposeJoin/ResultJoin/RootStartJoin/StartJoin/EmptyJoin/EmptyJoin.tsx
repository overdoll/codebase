import { Heading, Stack } from '@chakra-ui/react'
import Icon from '@//:modules/content/PageLayout/BuildingBlocks/Icon/Icon'
import { OverdollLogoOutline } from '@//:assets/logos'
import { Trans } from '@lingui/macro'
import EmptyJoinForm from './EmptyJoinForm/EmptyJoinForm'
import useEmptyJoinForm from '../support/useEmptyJoinForm'

export default function EmptyJoin (): JSX.Element {
  const {
    onSubmit,
    isInFlight
  } = useEmptyJoinForm({})

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
          <Trans>
            Join overdoll.
          </Trans>
        </Heading>
      </Stack>
      <EmptyJoinForm
        onSubmit={({ email }) => onSubmit(email)}
        isLoading={isInFlight}
      />
    </Stack>
  )
}
