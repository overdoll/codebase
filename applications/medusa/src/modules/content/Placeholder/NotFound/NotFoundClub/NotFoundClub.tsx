import { Center, Heading, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import NotFoundFooter from '../NotFoundFooter/NotFoundFooter'
import RootPublicClubRichObject
  from '../../../../../domain/slug/layout/domain/club/RootPublicClub/DisposePublicClub/ResultPublicClub/EmptyPublicClub/RootPublicClubRichObject/RootPublicClubRichObject'

export default function NotFoundClub (): JSX.Element {
  return (
    <>
      <RootPublicClubRichObject />
      <Center>
        <Stack spacing={8}>
          <Heading fontSize='2xl' color='gray.00'>
            <Trans>
              This club was not found
            </Trans>
          </Heading>
          <NotFoundFooter />
        </Stack>
      </Center>
    </>
  )
}
