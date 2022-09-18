import { Flex, Heading } from '@chakra-ui/react'
import Button from '../../../../../../../form/Button/Button'
import { Trans } from '@lingui/macro'
import { ArrowButtonRefresh } from '@//:assets/icons'
import { Icon } from '../../../../../../PageLayout'

interface Props {
  onClick: () => void
}

export default function ErrorButton (props: Props): JSX.Element {
  const { onClick } = props

  return (
    <Flex
      w='100%'
      h={24}
      align='center'
      justify='center'
    >
      <Heading mb={2} textAlign='center' color='gray.200' fontSize='sm'>
        <Trans>
          Something went wrong
        </Trans>
      </Heading>
      <Button
        onClick={onClick}
        variant='ghost'
        size='sm'
        color='gray.300'
        rightIcon={(
          <Icon icon={ArrowButtonRefresh} w={4} h={4} fill='gray.300' />
        )}
      >
        <Trans>
          Retry
        </Trans>
      </Button>
    </Flex>
  )
}
