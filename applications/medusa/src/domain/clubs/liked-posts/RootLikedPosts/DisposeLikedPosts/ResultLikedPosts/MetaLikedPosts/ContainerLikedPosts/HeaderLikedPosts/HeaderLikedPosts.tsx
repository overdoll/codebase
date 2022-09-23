import { Heading, HStack, Stack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import SearchButton from '@//:common/components/PageHeader/SearchButton/SearchButton'

export default function HeaderLikedPosts (): JSX.Element {
  return (
    <Stack spacing={2}>
      <HStack spacing={2} justify='space-between'>
        <Heading color='gray.00' fontSize='2xl'>
          <Trans>Your Saved Posts</Trans>
        </Heading>
        <SearchButton />
      </HStack>
    </Stack>
  )
}
