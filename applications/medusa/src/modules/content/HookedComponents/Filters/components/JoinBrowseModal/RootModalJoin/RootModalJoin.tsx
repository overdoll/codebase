import { Trans } from '@lingui/macro'
import { Flex, Heading, Spinner, Stack } from '@chakra-ui/react'
import Icon from '../../../../../PageLayout/BuildingBlocks/Icon/Icon'
import { OverdollLogoOutline } from '@//:assets/logos'
import EmptyJoinForm
  from '@//:domain/join/RootJoin/DisposeJoin/ResultJoin/RootStartJoin/StartJoin/EmptyJoin/EmptyJoinForm/EmptyJoinForm'
import useEmptyJoinForm
  from '@//:domain/join/RootJoin/DisposeJoin/ResultJoin/RootStartJoin/StartJoin/support/useEmptyJoinForm'
import { useJoin } from '@//:domain/app/Root/DisposeRoot/ResultRoot/JoinModal/JoinModal'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useLocalStorage } from 'usehooks-ts'

export default function RootModalJoin (): JSX.Element {
  const onJoin = useJoin()

  const router = useRouter()

  const [changing, setChanging] = useState(false)

  const [, setClosedJoinBannerStorage] = useLocalStorage('closedJoinBannerPopup', false)

  const onEmailComplete = (): void => {
    onJoin()
  }

  const {
    onSubmit,
    isInFlight
  } = useEmptyJoinForm({
    onSubmit: () => {
      onEmailComplete()
      setClosedJoinBannerStorage(true)
    }
  })

  const routeChangeStart = (): void => {
    setChanging(true)
  }

  const routeChangeEnd = (): void => {
    setChanging(false)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', routeChangeStart)
    router.events.on('routeChangeComplete', routeChangeEnd)
    router.events.on('routeChangeError', routeChangeEnd)
    return () => {
      router.events.off('routeChangeStart', routeChangeStart)
      router.events.off('routeChangeComplete', routeChangeEnd)
      router.events.off('routeChangeError', routeChangeEnd)
    }
  }, [])

  if (changing) {
    return (
      <Flex w='100%' h={400} justify='center' align='center'>
        <Spinner thickness='6px' color='gray.00' w={16} h={16} />
      </Flex>
    )
  }

  // Ask user to authenticate
  return (
    <Stack w='100%' h='100%' justify='center' align='center' spacing={4}>
      <Stack w='100%' spacing={4}>
        <Icon
          icon={OverdollLogoOutline}
          w={8}
          h={8}
          fill='gray.00'
        />
        <Heading fontSize='2xl' color='gray.00'>
          <Trans>
            Join overdoll for the full 18+ art experience.
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
