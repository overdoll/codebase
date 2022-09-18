import { Flex, Heading } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { Icon } from '../../../../../PageLayout'
import { SadError } from '@//:assets/icons'

export default function EmptyPaginationScroller (): JSX.Element {
  return (
    <Flex
      w='100%'
      h={24}
      align='center'
      justify='center'
    >
      <Icon mb={2} icon={SadError} w={4} h={4} fill='gray.300' />
      <Heading textAlign='center' color='gray.300' fontSize='sm'>
        <Trans>
          We couldn't find any posts
        </Trans>
      </Heading>
    </Flex>
  )
}
