import { Heading, HStack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import SearchButton from '@//:common/components/PageHeader/SearchButton/SearchButton'

export default function HeaderRandom (): JSX.Element {
  return (
    <HStack spacing={2} justify='space-between'>
      <Heading color='gray.00' fontSize='2xl'>
        <Trans>Random Posts</Trans>
      </Heading>
      <SearchButton />
    </HStack>
  )
}
