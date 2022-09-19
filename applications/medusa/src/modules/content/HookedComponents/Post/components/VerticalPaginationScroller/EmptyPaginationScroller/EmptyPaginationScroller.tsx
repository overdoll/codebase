import { Heading, HStack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Icon } from '../../../../../PageLayout'
import { SadError } from '@//:assets/icons'

export default function EmptyPaginationScroller (): JSX.Element {
  return (
    <HStack
      spacing={2}
      w='100%'
      h={24}
      align='center'
      justify='center'
    >
      <Icon icon={SadError} w={4} h={4} fill='gray.300' />
      <Heading textAlign='center' color='gray.300' fontSize='sm'>
        <Trans>
          We couldn't find any posts
        </Trans>
      </Heading>
    </HStack>
  )
}
